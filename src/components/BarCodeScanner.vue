<template>
  <div class="scanner">
    <h2>Upload Barcode Image</h2>
    <van-button type="primary">test</van-button>
    <input type="file" accept="image/*" @change="onFileChange" />

    <!-- hidden container required by Html5Qrcode for file scanning -->
    <div id="temp-reader" style="display: none;"></div>

    <hr />

    <h2>Camera Scan</h2>

    <div class="camera-controls">
      <label for="cameraSelect">Camera:</label>
      <select id="cameraSelect" v-model="selectedCameraId">
        <option v-for="cam in cameras" :key="cam.id" :value="cam.id">
          {{ cam.label || cam.id }}
        </option>
      </select>

      <button @click="toggleCamera">
        {{ scanningWithCamera ? 'Stop Camera' : 'Start Camera' }}
      </button>
    </div>

    <!-- visible camera container required by Html5Qrcode for live scanning -->
    <div id="reader" class="camera-view" v-show="scanningWithCamera"></div>

    <p v-if="loading">🔄 Scanning...</p>

    <p v-if="result" class="success">
      ✅ Result: {{ result }}
    </p>

    <p v-if="error" class="error">
      ❌ {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

// state
const result = ref<string | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);

// camera state
const cameras = ref<Array<{ id: string; label?: string }>>([]);
const selectedCameraId = ref<string | null>(null);
const scanningWithCamera = ref(false);
let cameraScanner: Html5Qrcode | null = null;

// handler for file upload scanning
const onFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // reset state
  result.value = null;
  error.value = null;

  // validate file
  if (!file.type.startsWith("image/")) {
    error.value = "Please upload a valid image file.";
    return;
  }

  loading.value = true;

  // create scanner instance for file scanning (uses hidden container)
  const fileScanner = new Html5Qrcode("temp-reader", {
    verbose: false,
    formatsToSupport: [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.QR_CODE
    ]
  });

  try {
    const decodedText = await fileScanner.scanFile(file, true);
    result.value = decodedText;
  } catch (err) {
    error.value = "No barcode detected. Try a clearer image.";
  } finally {
    // ensure resources are released
    try {
      await fileScanner.clear();
    } catch {
      // ignore clear errors
    }
    loading.value = false;
  }
};

// camera scanning functions
const populateCameras = async () => {
  try {
    const devices = await Html5Qrcode.getCameras();
    cameras.value = devices.map(d => ({ id: d.id, label: d.label }));
    if (devices.length > 0) {
      selectedCameraId.value = selectedCameraId.value || devices[0].id;
    }
  } catch {
    // cameras not available or permission denied
    cameras.value = [];
  }
};

const startCamera = async () => {
  if (scanningWithCamera.value) return;
  result.value = null;
  error.value = null;

  const cameraId = selectedCameraId.value;
  if (!cameraId) {
    error.value = "No camera selected or available.";
    return;
  }

  cameraScanner = new Html5Qrcode("reader", { verbose: false });

  try {
    scanningWithCamera.value = true;
    // start scanning; stop automatically on first successful decode
    await cameraScanner.start(
      cameraId,
      {
        fps: 10,
        qrbox: 250,
        formatsToSupport: [
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.QR_CODE
        ]
      },
      (decodedText) => {
        result.value = decodedText;
        // stop after successful decode
        void stopCamera();
      },
      (errorMessage) => {
        // optional per-frame errors; ignore or log
        // console.log('scan error', errorMessage);
      }
    );
  } catch (err) {
    error.value = "Unable to start camera. Check permissions or device.";
    scanningWithCamera.value = false;
    try {
      await cameraScanner.clear();
    } catch {
      // ignore
    }
    cameraScanner = null;
  }
};

const stopCamera = async () => {
  if (!cameraScanner) {
    scanningWithCamera.value = false;
    return;
  }
  try {
    await cameraScanner.stop();
  } catch {
    // ignore stop errors
  }
  try {
    await cameraScanner.clear();
  } catch {
    // ignore clear errors
  }
  cameraScanner = null;
  scanningWithCamera.value = false;
};

const toggleCamera = async () => {
  if (scanningWithCamera.value) {
    await stopCamera();
  } else {
    await startCamera();
  }
};

// lifecycle
onMounted(() => {
  void populateCameras();
});

onBeforeUnmount(async () => {
  // ensure camera scanner cleaned up
  if (cameraScanner) {
    try {
      await cameraScanner.stop();
    } catch { }
    try {
      await cameraScanner.clear();
    } catch { }
    cameraScanner = null;
  }
});
</script>

<style scoped>
.scanner {
  max-width: 600px;
  margin: auto;
  text-align: center;
}

.camera-controls {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.camera-view {
  width: 100%;
  max-width: 480px;
  height: 360px;
  margin: 0 auto 12px;
  background: #000;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>