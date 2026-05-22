<template>
  <div class="not-found" role="main">
    <div class="card" role="region" aria-labelledby="pnf-title">
      <div class="illustration" aria-hidden>
        <!-- simple inline SVG -->
        <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="152" height="104" rx="10" fill="#F3F4F6"/>
          <path d="M40 86L60 52L84 76L110 38L132 86" stroke="#111827" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <h1 id="pnf-title">404</h1>
      <p class="message">We couldn't find the page you're looking for.</p>

      <div class="actions">
        <button class="btn primary" @click="goHome" type="button">Go to Home</button>
        <button class="btn" @click="goBack" type="button">Go Back</button>
      </div>

      <p class="hint">If you typed the URL directly, check for mistakes.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  // navigate to root; adjust path if your app uses a named route
  void router.push('/');
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.card {
  max-width: 520px;
  width: 100%;
  text-align: center;
  background: var(--card-bg, #ffffff);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 6px 24px rgba(16,24,40,0.08);
}

.illustration {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

h1 {
  font-size: 48px;
  margin: 6px 0;
  color: #111827;
}

.message {
  margin: 0 0 18px;
  color: #374151;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 12px;
}

.btn {
  padding: 10px 16px;
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