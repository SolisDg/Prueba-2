
import React, { useState, useEffect } from 'react';

import { getProducts, getUsers, getCategories } from '../services/api';

import './Dashboard.css';

function Dashboard() {
    const [stats, setStats] = useState({
        totalProduct: 0,
        totalUsers: 0,
        totalCategories: 0
    });
    const [lastProduct, setLastProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try {
                const [productData, usersData, categoriesData] = await Promise.all([
                    getProducts(1, 1),
                    getUsers(1,1),
                    getCategories()
                ]);
                setStats({
                    totalProduct: productsData.count,
                    totalUsers: usersData.count,
                    totalCategories: categoriesData.categories.length
                });
                if (productsData.products.length > 0){
                    setLastProduct(productsData.products[0]);
                }
                setCategories(categoriesData.categories);
                setLoading(false);
            } catch (err) {
                console.error('Error cargando datos:', err);
                setError('Error al cargar los datos del Dashboard');
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return <div className="loading">Cargando dashboard...</div>;
    }
    if (error) {
        return <div className="error">{error}</div>;
    }
    return (
        <div className="dashboard">
            <h1>Dashboard de Pretty Thermo</h1>
            <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-icon">📦</span>
                <span className="stat-value">{stats.totalProducts}</span>
                <span className="stat-label">Productos</span>
            </div>
            <div className="stat-card">
                <span className="stat-icon">👥</span>
                <span className="stat-value">{stats.totalUsers}</span>
                <span className="stat-label">Usuarios</span>
            </div>
            <div className="stat-card">
                <span className="stat-icon">🏷</span>
                <span className="stat-value">{stats.totalCategories}</span>
                <span className="stat-label">Categorías</span>
            </div>
        </div>
        {lastProduct && (
            <div className="last-product">
                <h2>Último producto agregado</h2>
                <div className="product-preview">
                    <img src={lastProduct.image} alt={lastProduct.name} />
                    <div>
                        <h3>{lastProduct.name}</h3>
                        <p>${lastProduct.price}</p>
                    </div>
                </div>
            </div>
        )}
        <div className="categories-panel">
            <h2>Categorías</h2>
            <ul>
                {categories.map(cat => (
                    <li key={cat.id}>
                        {cat.name}
                        <span className="badge">{cat.productCount || 0} productos</span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
export default Dashboard;