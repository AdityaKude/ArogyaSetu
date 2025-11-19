export function reportWebVitals(metric: any) {
  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  } else {
    // Fallback: log to console for now
    console.info('[WebVitals]', metric);
  }
}



