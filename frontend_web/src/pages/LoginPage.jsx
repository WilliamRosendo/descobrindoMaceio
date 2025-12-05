import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { authService } from '../services/auth.service';
import "../styles/login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ← ADICIONADO
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ← ADICIONADO: Mostrar mensagem se veio de redirecionamento
  useEffect(() => {
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.senha) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.login(formData.email, formData.senha);
      
      // ← ADICIONADO: Redirecionar para página anterior se existir
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.error || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-illustration">
          <div className="illustration-content">
            <div className="illustration-icon">🌴</div>
            <h1 className="illustration-title">Bem-vindo de volta!</h1>
            <p className="illustration-text">
              Faça login para continuar explorando os melhores lugares de Maceió
            </p>
          </div>
        </div>

        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h2 className="form-title">Entrar</h2>
            <p className="form-subtitle">Entre com suas credenciais</p>

            {error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-wrapper">
                  <Mail size={20} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="senha" className="form-label">
                  Senha
                </label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha"
                    className="form-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Lembrar-me</span>
                </label>
                <a href="#" className="forgot-link">
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Entrando...</span>
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="link">
                  Criar conta
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;