// ...existing code...
<template>
  <main class="dev-page" role="main" aria-labelledby="dev-title">
    <section class="card" role="region" aria-labelledby="dev-title">
      <div class="illustration" aria-hidden>
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="128" height="104" rx="10" fill="#F3F4F6"/>
          <g stroke="#111827" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M28 86L44 56L64 76L88 46L112 86" />
          </g>
        </svg>
      </div>

      <h1 id="dev-title">{{ useRoute().name }} — Under development</h1>
      <p class="lead">This section is being built. Check back soon for interactive reports and analytics.</p>

      <ul class="features" aria-hidden>
        <li>📊 Summary dashboards</li>
        <li>📈 Trend charts and export CSV</li>
        <li>🔖 Filtered and scheduled reports</li>
      </ul>

      <div class="actions">
        <button class="btn primary" @click="goHome" type="button">Go to Home</button>
        <button class="btn" @click="notifyMe" type="button">Notify me</button>
      </div>

      <p class="hint">Want this feature sooner? Open an issue or send feedback.</p>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const notified = ref(false);

const goHome = () => {
  void router.push('/');
};

const notifyMe = () => {
  notified.value = true;
  // placeholder: integrate real notification/feedback flow later
  setTimeout(() => { notified.value = false; }, 1800);
};
</script>

<style scoped>
.dev-page {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
}

.card {
  max-width: 640px;
  width: 100%;
  text-align: center;
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 8px 32px rgba(16, 24, 40, 0.06);
}

.illustration {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

h1 {
  font-size: 28px;
  margin: 8px 0 6px;
  color: #111827;
}

.lead {
  margin: 0 0 16px;
  color: #374151;
}

.features {
  list-style: none;
  padding: 0;
  margin: 0 0 18px;
  color: #475569;
  display: grid;
  gap: 6px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 12px;
}

.btn {
  padding: 9px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  cursor: pointer;
  font-weight: 600;
}

.btn.primary {
  background: #2563eb;
  color: #fff;
  border-color: transparent;
}

.btn:active { transform: translateY(1px); }

.hint {
  font-size: 13px;
  color: #6b7280;
  margin-top: 6px;
}
</style>