import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isLogin) {
            // Simple login - store user in localStorage
            if (email && password) {
                localStorage.setItem("user", JSON.stringify({ email, name: email.split('@')[0] }));
                alert("Login successful!");
                navigate('/');
            } else {
                alert("Please enter email and password");
            }
        } else {
            // Simple signup
            if (email && password && name) {
                localStorage.setItem("user", JSON.stringify({ email, name }));
                alert("Account created successfully!");
                navigate('/');
            } else {
                alert("Please fill all fields");
            }
        }
    }
    
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem 1.5rem'
        }}>
            <div style={{margin: '0 auto', width: '100%', maxWidth: '28rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h2 style={{
                        fontSize: '1.875rem',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '0.5rem'
                    }}>
                        {isLogin ? 'Sign in to your account' : 'Create new account'}
                    </h2>
                    <p style={{fontSize: '0.875rem', color: '#6b7280'}}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            style={{
                                fontWeight: '500',
                                color: '#2563eb',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>

                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    borderRadius: '0.5rem'
                }}>
                    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                        {!isLogin && (
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    color: '#374151',
                                    marginBottom: '0.5rem'
                                }}>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0.375rem',
                                        fontSize: '1rem'
                                    }}
                                    placeholder="Enter your full name"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.375rem',
                                    fontSize: '1rem'
                                }}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '0.75rem 1rem',
                                border: 'none',
                                borderRadius: '0.375rem',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                color: 'white',
                                backgroundColor: '#2563eb',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                        >
                            {isLogin ? 'Sign in' : 'Create account'}
                        </button>
                    </form>

                    <div style={{marginTop: '1.5rem'}}>
                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '100%',
                                borderTop: '1px solid #d1d5db'
                            }} />
                            <span style={{
                                padding: '0 0.5rem',
                                backgroundColor: 'white',
                                fontSize: '0.875rem',
                                color: '#6b7280'
                            }}>Demo credentials</span>
                            <div style={{
                                width: '100%',
                                borderTop: '1px solid #d1d5db'
                            }} />
                        </div>
                        <div style={{textAlign: 'center', fontSize: '0.875rem', color: '#6b7280'}}>
                            <p>Email: demo@example.com</p>
                            <p>Password: demo123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}