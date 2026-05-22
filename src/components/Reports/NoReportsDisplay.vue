<template>
    <div class="no-data-overlay">
        <div class="no-data-content">
        <span class="no-data-icon">📭</span>
        <h3>No expenses tracked</h3>
        <p>There are no transactions recorded for this specific timeframe.</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
/* Beautiful Minimalist No Data Screen Overlay */
.no-data-overlay {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  text-align: center;
  .no-data-content {
    max-width: 280px;
    padding: 20px;
    & h3 {
      color: #334155; /* Slate dark title */
      font-size: 1.1rem;
      font-weight: 700;
      margin: 0 0 6px 0;
    }
    
    & p {
      color: #94a3b8; /* Muted gray helpful text */
      font-size: 0.88rem;
      line-height: 1.4;
      margin: 0;
    }
  }
  .no-data-icon {
    font-size: 2.8rem;
    display: block;
    margin-bottom: 12px;
    filter: grayscale(0.2);
    animation: float 3s ease-in-out infinite;
  }
}

/* Subtle idle float animation for the icon to make the page feel alive */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>