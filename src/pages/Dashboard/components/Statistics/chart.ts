const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 13,
        },
        color: '#9E9E9E',
      },
    },
    y: {
      grid: {
        display: true,
        color: '#E0E0E0',
      },
      display: true,
      ticks: {
        font: {
          size: 13,
        },
        color: '#0A0A0A',
      },
      beginAtZero: true,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
};

export default { options };
