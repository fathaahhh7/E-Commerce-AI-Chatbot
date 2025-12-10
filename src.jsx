import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingCart, TrendingUp, BarChart3, Loader2 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Comprehensive E-commerce Database
const ecommerceDatabase = {
  products: [
    { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, cost: 45, stock: 150, sold: 320, rating: 4.5, returns: 8 },
    { id: 2, name: "Smart Watch", category: "Electronics", price: 199.99, cost: 120, stock: 85, sold: 180, rating: 4.7, returns: 5 },
    { id: 3, name: "Yoga Mat", category: "Fitness", price: 29.99, cost: 12, stock: 200, sold: 450, rating: 4.3, returns: 12 },
    { id: 4, name: "Coffee Maker", category: "Home & Kitchen", price: 89.99, cost: 50, stock: 60, sold: 210, rating: 4.6, returns: 7 },
    { id: 5, name: "Running Shoes", category: "Fashion", price: 119.99, cost: 65, stock: 120, sold: 290, rating: 4.4, returns: 15 },
    { id: 6, name: "Laptop Backpack", category: "Accessories", price: 49.99, cost: 22, stock: 180, sold: 380, rating: 4.5, returns: 10 },
    { id: 7, name: "Bluetooth Speaker", category: "Electronics", price: 59.99, cost: 30, stock: 95, sold: 410, rating: 4.6, returns: 9 },
    { id: 8, name: "Desk Lamp", category: "Home & Kitchen", price: 39.99, cost: 18, stock: 140, sold: 260, rating: 4.2, returns: 6 },
    { id: 9, name: "Water Bottle", category: "Fitness", price: 24.99, cost: 8, stock: 300, sold: 620, rating: 4.7, returns: 18 },
    { id: 10, name: "Phone Case", category: "Accessories", price: 19.99, cost: 5, stock: 500, sold: 890, rating: 4.3, returns: 22 },
    { id: 11, name: "Gaming Mouse", category: "Electronics", price: 69.99, cost: 35, stock: 110, sold: 245, rating: 4.6, returns: 7 },
    { id: 12, name: "Resistance Bands", category: "Fitness", price: 34.99, cost: 15, stock: 175, sold: 310, rating: 4.4, returns: 8 }
  ],
  
  orders: [
    { id: 1001, date: "2024-11-01", customerId: 501, items: [1, 3], total: 109.98, status: "Delivered", profit: 52.98 },
    { id: 1002, date: "2024-11-05", customerId: 502, items: [2], total: 199.99, status: "Delivered", profit: 79.99 },
    { id: 1003, date: "2024-11-10", customerId: 503, items: [7, 9], total: 84.98, status: "Delivered", profit: 46.98 },
    { id: 1004, date: "2024-11-15", customerId: 504, items: [5, 6], total: 169.98, status: "Delivered", profit: 82.98 },
    { id: 1005, date: "2024-11-20", customerId: 505, items: [4, 8], total: 129.98, status: "Delivered", profit: 61.98 },
    { id: 1006, date: "2024-11-25", customerId: 506, items: [10, 10, 10], total: 59.97, status: "Delivered", profit: 44.97 },
    { id: 1007, date: "2024-12-01", customerId: 507, items: [1, 2, 7], total: 339.97, status: "Delivered", profit: 174.97 },
    { id: 1008, date: "2024-12-03", customerId: 508, items: [3, 9], total: 54.98, status: "Shipped", profit: 28.98 },
    { id: 1009, date: "2024-12-05", customerId: 509, items: [11, 6], total: 119.98, status: "Processing", profit: 62.98 },
    { id: 1010, date: "2024-12-07", customerId: 510, items: [12, 9, 10], total: 79.97, status: "Processing", profit: 51.97 }
  ],
  
  customers: [
    { id: 501, name: "John Smith", email: "john@email.com", totalSpent: 549.95, orders: 5, joinDate: "2024-01-15", location: "New York" },
    { id: 502, name: "Sarah Johnson", email: "sarah@email.com", totalSpent: 799.96, orders: 4, joinDate: "2024-02-20", location: "Los Angeles" },
    { id: 503, name: "Mike Davis", email: "mike@email.com", totalSpent: 384.97, orders: 3, joinDate: "2024-03-10", location: "Chicago" },
    { id: 504, name: "Emily Brown", email: "emily@email.com", totalSpent: 1249.92, orders: 8, joinDate: "2024-01-05", location: "Houston" },
    { id: 505, name: "David Wilson", email: "david@email.com", totalSpent: 629.95, orders: 6, joinDate: "2024-04-12", location: "Phoenix" },
    { id: 506, name: "Lisa Martinez", email: "lisa@email.com", totalSpent: 459.94, orders: 4, joinDate: "2024-05-08", location: "Philadelphia" },
    { id: 507, name: "Tom Anderson", email: "tom@email.com", totalSpent: 889.93, orders: 7, joinDate: "2024-02-28", location: "San Antonio" },
    { id: 508, name: "Anna Taylor", email: "anna@email.com", totalSpent: 324.96, orders: 3, joinDate: "2024-06-15", location: "San Diego" },
    { id: 509, name: "Chris Lee", email: "chris@email.com", totalSpent: 675.89, orders: 5, joinDate: "2024-03-22", location: "Dallas" },
    { id: 510, name: "Jessica White", email: "jessica@email.com", totalSpent: 445.78, orders: 4, joinDate: "2024-05-30", location: "San Jose" }
  ],
  
  expenses: {
    monthly: {
      rent: 5000,
      utilities: 800,
      salaries: 15000,
      marketing: 3000,
      shipping: 2500,
      packaging: 1200,
      software: 500,
      insurance: 600,
      maintenance: 400,
      other: 1000
    }
  },
  
  monthlySales: [
    { month: "Jun", revenue: 8500, profit: 3200, orders: 45 },
    { month: "Jul", revenue: 9200, profit: 3800, orders: 52 },
    { month: "Aug", revenue: 10100, profit: 4200, orders: 58 },
    { month: "Sep", revenue: 11500, profit: 4900, orders: 65 },
    { month: "Oct", revenue: 12800, profit: 5500, orders: 72 },
    { month: "Nov", revenue: 14200, profit: 6100, orders: 80 },
    { month: "Dec", revenue: 15600, profit: 6800, orders: 88 }
  ]
};

// Advanced AI Analysis with Charts
const analyzeQuery = (query) => {
  const q = query.toLowerCase();
  const db = ecommerceDatabase;
  
  // Calculate comprehensive metrics
  const totalRevenue = db.orders.reduce((sum, order) => sum + order.total, 0);
  const totalProfit = db.orders.reduce((sum, order) => sum + order.profit, 0);
  const totalCost = db.products.reduce((sum, p) => sum + (p.cost * p.sold), 0);
  const grossProfit = db.products.reduce((sum, p) => sum + ((p.price - p.cost) * p.sold), 0);
  const monthlyExpenses = Object.values(db.expenses.monthly).reduce((a, b) => a + b, 0);
  const netProfit = grossProfit - monthlyExpenses;
  const totalProductsSold = db.products.reduce((sum, p) => sum + p.sold, 0);
  const avgOrderValue = totalRevenue / db.orders.length;
  const profitMargin = (netProfit / totalRevenue) * 100;
  const totalReturns = db.products.reduce((sum, p) => sum + p.returns, 0);
  const returnRate = (totalReturns / totalProductsSold) * 100;
  
  // Calculate product-level metrics
  const productMetrics = db.products.map(p => ({
    ...p,
    revenue: p.price * p.sold,
    profit: (p.price - p.cost) * p.sold,
    profitMargin: ((p.price - p.cost) / p.price * 100),
    returnRate: (p.returns / p.sold * 100),
    roi: (((p.price - p.cost) * p.sold) / (p.cost * p.sold) * 100)
  }));
  
  // Category analysis
  const categoryData = {};
  db.products.forEach(p => {
    if (!categoryData[p.category]) {
      categoryData[p.category] = { revenue: 0, profit: 0, sold: 0, products: 0 };
    }
    categoryData[p.category].revenue += p.price * p.sold;
    categoryData[p.category].profit += (p.price - p.cost) * p.sold;
    categoryData[p.category].sold += p.sold;
    categoryData[p.category].products += 1;
  });

  // Chart generation helper
  const createChart = (type, data, title) => ({
    type,
    data,
    title
  });

  // Profit-related queries with calculations
  if (q.includes('profit')) {
    const charts = [];
    
    // Monthly profit trend
    charts.push(createChart('line', db.monthlySales.map(m => ({
      month: m.month,
      profit: m.profit,
      revenue: m.revenue
    })), 'Monthly Profit Trend'));
    
    // Top profitable products
    const topProfitable = productMetrics.sort((a, b) => b.profit - a.profit).slice(0, 5);
    charts.push(createChart('bar', topProfitable.map(p => ({
      name: p.name,
      profit: p.profit.toFixed(2)
    })), 'Top 5 Profitable Products'));
    
    // Category profit distribution
    charts.push(createChart('pie', Object.entries(categoryData).map(([cat, data]) => ({
      name: cat,
      value: data.profit
    })), 'Profit by Category'));
    
    const response = `**Comprehensive Profit Analysis**

📊 **Overall Profitability:**
• Gross Profit: $${grossProfit.toFixed(2)}
• Total Costs: $${totalCost.toFixed(2)}
• Monthly Expenses: $${monthlyExpenses.toFixed(2)}
• Net Profit: $${netProfit.toFixed(2)}
• Profit Margin: ${profitMargin.toFixed(2)}%
• ROI: ${((grossProfit / totalCost) * 100).toFixed(2)}%

💰 **Top 3 Most Profitable Products:**
${topProfitable.slice(0, 3).map((p, i) => 
  `${i + 1}. ${p.name}: $${p.profit.toFixed(2)} profit (${p.profitMargin.toFixed(1)}% margin, ${p.sold} units sold)`
).join('\n')}

📈 **Profit Growth:**
• Last Month: $${db.monthlySales[db.monthlySales.length - 1].profit}
• Previous Month: $${db.monthlySales[db.monthlySales.length - 2].profit}
• Growth: ${(((db.monthlySales[db.monthlySales.length - 1].profit - db.monthlySales[db.monthlySales.length - 2].profit) / db.monthlySales[db.monthlySales.length - 2].profit) * 100).toFixed(1)}%

🎯 **Category Performance:**
${Object.entries(categoryData).sort((a, b) => b[1].profit - a[1].profit).map(([cat, data]) => 
  `• ${cat}: $${data.profit.toFixed(2)} profit from ${data.sold} units`
).join('\n')}`;
    
    return { text: response, charts };
  }

  // Sales analysis
  if (q.includes('sales') || q.includes('selling')) {
    const charts = [];
    
    // Sales trend
    charts.push(createChart('line', db.monthlySales.map(m => ({
      month: m.month,
      orders: m.orders,
      revenue: m.revenue
    })), 'Sales Trend Over Time'));
    
    // Best sellers
    const topSellers = productMetrics.sort((a, b) => b.sold - a.sold).slice(0, 6);
    charts.push(createChart('bar', topSellers.map(p => ({
      name: p.name,
      sold: p.sold
    })), 'Top Selling Products'));
    
    const response = `**Sales Performance Analysis**

📦 **Overall Sales Metrics:**
• Total Units Sold: ${totalProductsSold}
• Total Revenue: $${totalRevenue.toFixed(2)}
• Average Order Value: $${avgOrderValue.toFixed(2)}
• Total Orders: ${db.orders.length}
• Average Items per Order: ${(totalProductsSold / db.orders.length).toFixed(1)}

🏆 **Top 5 Best Sellers:**
${topSellers.slice(0, 5).map((p, i) => 
  `${i + 1}. ${p.name}: ${p.sold} units ($${p.revenue.toFixed(2)} revenue, ${p.rating}⭐)`
).join('\n')}

📊 **Sales by Category:**
${Object.entries(categoryData).sort((a, b) => b[1].sold - a[1].sold).map(([cat, data]) => 
  `• ${cat}: ${data.sold} units (${((data.sold / totalProductsSold) * 100).toFixed(1)}% of total)`
).join('\n')}

⚠️ **Return Rate:** ${returnRate.toFixed(2)}% (${totalReturns} returns out of ${totalProductsSold} sales)`;
    
    return { text: response, charts };
  }

  // Revenue analysis
  if (q.includes('revenue') || q.includes('income')) {
    const charts = [];
    
    charts.push(createChart('line', db.monthlySales, 'Revenue Growth'));
    
    charts.push(createChart('pie', Object.entries(categoryData).map(([cat, data]) => ({
      name: cat,
      value: data.revenue
    })), 'Revenue Distribution by Category'));
    
    const response = `**Revenue Analysis**

💵 **Revenue Overview:**
• Total Revenue: $${totalRevenue.toFixed(2)}
• Average Order Value: $${avgOrderValue.toFixed(2)}
• Revenue per Product: $${(totalRevenue / db.products.length).toFixed(2)}
• Revenue per Customer: $${(totalRevenue / db.customers.length).toFixed(2)}

📈 **Monthly Performance:**
${db.monthlySales.slice(-3).map(m => 
  `• ${m.month}: $${m.revenue} (${m.orders} orders)`
).join('\n')}

🎯 **Revenue by Category:**
${Object.entries(categoryData).sort((a, b) => b[1].revenue - a[1].revenue).map(([cat, data]) => 
  `• ${cat}: $${data.revenue.toFixed(2)} (${((data.revenue / totalRevenue) * 100).toFixed(1)}%)`
).join('\n')}

💡 **Top Revenue Generators:**
${productMetrics.sort((a, b) => b.revenue - a.revenue).slice(0, 3).map((p, i) => 
  `${i + 1}. ${p.name}: $${p.revenue.toFixed(2)}`
).join('\n')}`;
    
    return { text: response, charts };
  }

  // Inventory analysis
  if (q.includes('inventory') || q.includes('stock')) {
    const lowStock = productMetrics.filter(p => p.stock < 100);
    const overStock = productMetrics.filter(p => p.stock > 250);
    const totalStockValue = db.products.reduce((sum, p) => sum + (p.cost * p.stock), 0);
    
    const charts = [];
    charts.push(createChart('bar', db.products.sort((a, b) => a.stock - b.stock).slice(0, 8).map(p => ({
      name: p.name,
      stock: p.stock
    })), 'Current Inventory Levels'));
    
    const response = `**Inventory Analysis**

📦 **Stock Overview:**
• Total Stock Value: $${totalStockValue.toFixed(2)}
• Total Products: ${db.products.length}
• Average Stock per Product: ${(db.products.reduce((sum, p) => sum + p.stock, 0) / db.products.length).toFixed(0)} units
• Products in Stock: ${db.products.length}

⚠️ **Low Stock Alerts (< 100 units):**
${lowStock.length > 0 ? lowStock.map(p => 
  `• ${p.name}: ${p.stock} units (Sold: ${p.sold}, Turnover rate: ${((p.sold / (p.sold + p.stock)) * 100).toFixed(1)}%)`
).join('\n') : '✅ All products adequately stocked'}

📊 **Overstock Items (> 250 units):**
${overStock.length > 0 ? overStock.map(p => 
  `• ${p.name}: ${p.stock} units`
).join('\n') : '✅ No overstock issues'}

🔄 **Inventory Turnover:**
• Average Turnover Rate: ${((totalProductsSold / (totalProductsSold + db.products.reduce((sum, p) => sum + p.stock, 0))) * 100).toFixed(1)}%
• Reorder Recommendations: ${lowStock.length} products need restocking`;
    
    return { text: response, charts };
  }

  // Customer analysis
  if (q.includes('customer')) {
    const totalCustomerSpending = db.customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const avgCustomerValue = totalCustomerSpending / db.customers.length;
    const topCustomers = db.customers.sort((a, b) => b.totalSpent - a.totalSpent);
    
    const charts = [];
    charts.push(createChart('bar', topCustomers.slice(0, 5).map(c => ({
      name: c.name,
      spent: c.totalSpent.toFixed(2)
    })), 'Top 5 Customers by Spending'));
    
    const response = `**Customer Insights**

👥 **Customer Base:**
• Total Customers: ${db.customers.length}
• Average Customer Lifetime Value: $${avgCustomerValue.toFixed(2)}
• Total Customer Spending: $${totalCustomerSpending.toFixed(2)}
• Average Orders per Customer: ${(db.customers.reduce((sum, c) => sum + c.orders, 0) / db.customers.length).toFixed(1)}

🏆 **Top 5 Customers:**
${topCustomers.slice(0, 5).map((c, i) => 
  `${i + 1}. ${c.name}: $${c.totalSpent.toFixed(2)} (${c.orders} orders, joined ${c.joinDate})`
).join('\n')}

📊 **Customer Segmentation:**
• High Value (>$800): ${db.customers.filter(c => c.totalSpent > 800).length} customers
• Medium Value ($400-$800): ${db.customers.filter(c => c.totalSpent >= 400 && c.totalSpent <= 800).length} customers
• Low Value (<$400): ${db.customers.filter(c => c.totalSpent < 400).length} customers

📍 **Geographic Distribution:**
${[...new Set(db.customers.map(c => c.location))].slice(0, 5).map(loc => 
  `• ${loc}: ${db.customers.filter(c => c.location === loc).length} customers`
).join('\n')}`;
    
    return { text: response, charts };
  }

  // Expense analysis
  if (q.includes('expense') || q.includes('cost') && !q.includes('product')) {
    const expenseList = Object.entries(db.expenses.monthly).sort((a, b) => b[1] - a[1]);
    
    const charts = [];
    charts.push(createChart('pie', expenseList.map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: amount
    })), 'Expense Breakdown'));
    
    const response = `**Expense Analysis**

💸 **Monthly Expenses:**
• Total Monthly Expenses: $${monthlyExpenses.toFixed(2)}
• Expense to Revenue Ratio: ${((monthlyExpenses / totalRevenue) * 100).toFixed(2)}%
• Break-even Revenue Needed: $${(monthlyExpenses / (profitMargin / 100)).toFixed(2)}

📊 **Expense Breakdown:**
${expenseList.map(([name, amount]) => 
  `• ${name.charAt(0).toUpperCase() + name.slice(1)}: $${amount.toFixed(2)} (${((amount / monthlyExpenses) * 100).toFixed(1)}%)`
).join('\n')}

💡 **Cost Optimization Insights:**
• Largest Expense: ${expenseList[0][0]} ($${expenseList[0][1]})
• Fixed Costs: $${(db.expenses.monthly.rent + db.expenses.monthly.utilities + db.expenses.monthly.insurance).toFixed(2)}
• Variable Costs: $${(db.expenses.monthly.shipping + db.expenses.monthly.packaging + db.expenses.monthly.marketing).toFixed(2)}`;
    
    return { text: response, charts };
  }

  // Compare products
  if (q.includes('compare')) {
    const charts = [];
    charts.push(createChart('bar', productMetrics.slice(0, 6).map(p => ({
      name: p.name,
      profit: p.profit.toFixed(2),
      revenue: p.revenue.toFixed(2)
    })), 'Product Comparison: Profit vs Revenue'));
    
    const response = `**Product Comparison**

${productMetrics.slice(0, 5).map((p, i) => 
  `**${i + 1}. ${p.name}**
   • Revenue: $${p.revenue.toFixed(2)} | Profit: $${p.profit.toFixed(2)}
   • Margin: ${p.profitMargin.toFixed(1)}% | ROI: ${p.roi.toFixed(1)}%
   • Units Sold: ${p.sold} | Return Rate: ${p.returnRate.toFixed(2)}%
   • Rating: ${p.rating}⭐ | Stock: ${p.stock} units`
).join('\n\n')}`;
    
    return { text: response, charts };
  }

  // ROI calculation
  if (q.includes('roi') || q.includes('return on investment')) {
    const sortedByROI = productMetrics.sort((a, b) => b.roi - a.roi);
    
    const response = `**Return on Investment Analysis**

📈 **Overall ROI:**
• Total Investment: $${totalCost.toFixed(2)}
• Total Return: $${grossProfit.toFixed(2)}
• ROI: ${((grossProfit / totalCost) * 100).toFixed(2)}%

🏆 **Top 5 Products by ROI:**
${sortedByROI.slice(0, 5).map((p, i) => 
  `${i + 1}. ${p.name}: ${p.roi.toFixed(2)}% ROI
   Investment: $${(p.cost * p.sold).toFixed(2)} → Return: $${p.profit.toFixed(2)}`
).join('\n\n')}

💡 **Investment Efficiency:**
• Products with ROI > 100%: ${sortedByROI.filter(p => p.roi > 100).length}
• Products with ROI 50-100%: ${sortedByROI.filter(p => p.roi >= 50 && p.roi <= 100).length}
• Products with ROI < 50%: ${sortedByROI.filter(p => p.roi < 50).length}`;
    
    return { text: response, charts: [] };
  }

  // Calculate specific metrics
  if (q.includes('calculate') || q.includes('what is') || q.includes('how much')) {
    const response = `**Quick Calculations**

Based on your current data:

💰 **Financial Metrics:**
• Total Revenue: $${totalRevenue.toFixed(2)}
• Gross Profit: $${grossProfit.toFixed(2)}
• Net Profit: $${netProfit.toFixed(2)}
• Profit Margin: ${profitMargin.toFixed(2)}%

📊 **Operational Metrics:**
• Products Sold: ${totalProductsSold} units
• Average Order Value: $${avgOrderValue.toFixed(2)}
• Customer Lifetime Value: $${(totalRevenue / db.customers.length).toFixed(2)}
• Inventory Value: $${db.products.reduce((sum, p) => sum + (p.cost * p.stock), 0).toFixed(2)}

🎯 **Performance Indicators:**
• Best Selling Product: ${productMetrics.sort((a, b) => b.sold - a.sold)[0].name} (${productMetrics.sort((a, b) => b.sold - a.sold)[0].sold} units)
• Most Profitable Product: ${productMetrics.sort((a, b) => b.profit - a.profit)[0].name} ($${productMetrics.sort((a, b) => b.profit - a.profit)[0].profit.toFixed(2)})
• Average Product Rating: ${(db.products.reduce((sum, p) => sum + p.rating, 0) / db.products.length).toFixed(2)}⭐`;
    
    return { text: response, charts: [] };
  }

  // Default comprehensive overview
  const charts = [];
  charts.push(createChart('line', db.monthlySales, 'Revenue & Profit Trend'));
  charts.push(createChart('pie', Object.entries(categoryData).map(([cat, data]) => ({
    name: cat,
    value: data.revenue
  })), 'Revenue by Category'));
  
  const response = `**E-commerce Store Dashboard**

📊 **Financial Summary:**
• Total Revenue: $${totalRevenue.toFixed(2)}
• Gross Profit: $${grossProfit.toFixed(2)}
• Net Profit: $${netProfit.toFixed(2)}
• Profit Margin: ${profitMargin.toFixed(2)}%
• Monthly Expenses: $${monthlyExpenses.toFixed(2)}

📦 **Operations:**
• Products Sold: ${totalProductsSold} units
• Active Orders: ${db.orders.length}
• Total Customers: ${db.customers.length}
• Average Order Value: $${avgOrderValue.toFixed(2)}
• Return Rate: ${returnRate.toFixed(2)}%

🏆 **Top Performers:**
• Best Seller: ${productMetrics.sort((a, b) => b.sold - a.sold)[0].name}
• Most Profitable: ${productMetrics.sort((a, b) => b.profit - a.profit)[0].name}
• Top Customer: ${db.customers.sort((a, b) => b.totalSpent - a.totalSpent)[0].name}

💡 **Quick Insights:**
• ${productMetrics.filter(p => p.stock < 100).length} products need restocking
• Monthly profit growth: ${(((db.monthlySales[db.monthlySales.length - 1].profit - db.monthlySales[db.monthlySales.length - 2].profit) / db.monthlySales[db.monthlySales.length - 2].profit) * 100).toFixed(1)}%
• Customer retention: High-value customers generate ${((db.customers.filter(c => c.totalSpent > 800).reduce((sum, c) => sum + c.totalSpent, 0) / totalRevenue) * 100).toFixed(1)}% of revenue

Ask me anything: profits, sales trends, inventory, customer insights, ROI, comparisons, or calculations!`;
  
  return { text: response, charts };
};

const ChartComponent = ({ chart }) => {
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];
  
  if (chart.type === 'line') {
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">{chart.title}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {Object.keys(chart.data[0] || {}).filter(key => key !== 'month' && key !== 'name').map((key, idx) => (
              <Line key={key} type="monotone" dataKey={key} stroke={COLORS[idx]} strokeWidth={2} dot={{ fill: COLORS[idx], r: 4 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  if (chart.type === 'bar') {
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">{chart.title}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '11px' }} angle={-15} textAnchor="end" height={80} />
            <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {Object.keys(chart.data[0] || {}).filter(key => key !== 'name').map((key, idx) => (
              <Bar key={key} dataKey={key} fill={COLORS[idx]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  if (chart.type === 'pie') {
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">{chart.title}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chart.data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chart.data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
  
  return null;
};

const EcommerceAIChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: { text: 'Hello! I\'m your advanced e-commerce AI analyst with calculation capabilities and data visualization. I can analyze your store data, perform complex calculations, generate charts, and provide actionable insights.\n\nTry asking:\n• "Show me profit analysis with charts"\n• "Calculate ROI for all products"\n• "Compare top selling products"\n• "What are my revenue trends?"\n• "Analyze customer behavior"\n• "Calculate my inventory value"\n\nI\'ll provide detailed answers with visual charts!' }}
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: { text: input } };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = analyzeQuery(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };
  
  const db = ecommerceDatabase;
  const totalRevenue = db.orders.reduce((sum, order) => sum + order.total, 0);
  const totalProfit = db.orders.reduce((sum, order) => sum + order.profit, 0);
  const totalProducts = db.products.reduce((sum, p) => sum + p.sold, 0);
  const profitMargin = (totalProfit / totalRevenue) * 100;
  
  const quickQueries = [
    'Show profit analysis',
    'Calculate ROI',
    'Sales trends',
    'Customer insights',
    'Compare products',
    'Inventory status'
  ];
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b-2 border-indigo-100">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-indigo-600" />
              AI E-commerce Analytics
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="w-4 h-4" />
              <span className="font-medium">Advanced Mode</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-md text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold opacity-90">Total Revenue</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}K</div>
              <div className="text-xs opacity-80 mt-1">+12.5% from last month</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-md text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold opacity-90">Net Profit</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">${(totalProfit / 1000).toFixed(1)}K</div>
              <div className="text-xs opacity-80 mt-1">{profitMargin.toFixed(1)}% margin</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-md text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold opacity-90">Units Sold</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <div className="text-xs opacity-80 mt-1">{db.orders.length} orders</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md text-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold opacity-90">Customers</span>
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{db.customers.length}</div>
              <div className="text-xs opacity-80 mt-1">${(totalRevenue / db.customers.length).toFixed(0)} avg CLV</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-4xl w-full ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
              <div className={`rounded-2xl px-5 py-4 ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white text-gray-800 shadow-lg border border-gray-100'
              }`}>
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {msg.content.text}
                </div>
                
                {msg.content.charts && msg.content.charts.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {msg.content.charts.map((chart, chartIdx) => (
                      <ChartComponent key={chartIdx} chart={chart} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              <span className="text-sm text-gray-600">Analyzing data and generating insights...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Query Buttons */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 flex-wrap justify-center">
          {quickQueries.map((query) => (
            <button
              key={query}
              onClick={() => {
                setInput(query);
                setTimeout(() => {
                  const userMessage = { role: 'user', content: { text: query } };
                  setMessages(prev => [...prev, userMessage]);
                  setIsTyping(true);
                  setTimeout(() => {
                    const response = analyzeQuery(query);
                    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
                    setIsTyping(false);
                    setInput('');
                  }, 1000);
                }, 100);
              }}
              className="px-4 py-2 bg-white text-indigo-600 text-xs font-medium rounded-full border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
      
      {/* Enhanced Input Area */}
      <div className="bg-white border-t-2 border-indigo-100 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything: profits, trends, calculations, comparisons..."
            className="flex-1 px-5 py-3 border-2 border-indigo-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-7 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2 font-medium"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceAIChatbot;
