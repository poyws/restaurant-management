let orders = [];
let tables = new Array(6).fill(false);

function addToOrder(itemId) {
  const items = {
    1: { name: 'Filé à Parmegiana', price: 45.90 },
    2: { name: 'Salmão Grelhado', price: 55.90 }
  };
  
  orders.push({
    id: orders.length + 1,
    item: items[itemId],
    status: 'Preparando',
    time: new Date().toLocaleTimeString(),
    timestamp: new Date()
  });
  
  updateOrders();
}

function completeOrder(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = 'Pronto';
    const utterance = new SpeechSynthesisUtterance(`Pedido número ${orderId} está pronto para retirada`);
    utterance.lang = 'pt-BR';
    window.speechSynthesis.speak(utterance);
  }
  updateOrders();
}

function updateOrders() {
  const ordersList = document.getElementById('ordersList');
  ordersList.innerHTML = orders.map(order => {
    const timeDiff = Math.floor((new Date() - order.timestamp) / 1000 / 60);
    const buttonDisabled = order.status === 'Pronto' ? 'disabled' : '';
    return `
      <div class="order">
        <h4>#${order.id} - ${order.item.name}</h4>
        <p class="price">R$ ${order.item.price.toFixed(2)}</p>
        <span class="status ${order.status.toLowerCase()}">${order.status}</span>
        <p>Tempo: ${timeDiff} min</p>
        <button onclick="completeOrder(${order.id})" ${buttonDisabled} class="complete-btn">
          Anunciar Pedido Pronto
        </button>
      </div>
    `;
  }).join('');
}

const ctx = document.getElementById('salesChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
    datasets: [{
      label: 'Vendas Semanais (R$)',
      data: [1200, 1900, 1500, 1800, 2000, 2500, 1590],
      borderColor: 'var(--primary)',
      backgroundColor: 'rgba(74, 144, 226, 0.1)',
      fill: true
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'R$ ' + value;
          }
        }
      }
    }
  }
});

setInterval(updateOrders, 60000);
