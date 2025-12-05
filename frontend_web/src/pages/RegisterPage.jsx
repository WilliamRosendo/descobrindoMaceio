import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/auth.service';
import "../styles/register.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido');
      return false;
    }
    if (formData.senha.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.register(formData.nome, formData.email, formData.senha);
      setSuccess('Conta criada com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.error || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-illustration">
          <div className="illustration-content">
            <div className="illustration-icon">🌴</div>
            <h1 className="illustration-title">Descobrindo Maceió</h1>
            <p className="illustration-text">
              Crie sua conta e comece a explorar os melhores lugares de Maceió
            </p>
          </div>
        </div>

        <div className="register-form-container">
          <div className="register-form-wrapper">
            <h2 className="form-title">Criar Conta</h2>
            <p className="form-subtitle">Preencha seus dados para começar</p>

            {error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="alert alert-success">
                <CheckCircle size={20} />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="nome" className="form-label">
                  Nome Completo
                </label>
                <div className="input-wrapper">
                  <User size={20} className="input-icon" />
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome"
                    className="form-input"
                    disabled={loading}
                  />
                </div>
              </div>

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
                    placeholder="Mínimo 6 caracteres"
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

              <div className="form-group">
                <label htmlFor="confirmarSenha" className="form-label">
                  Confirmar Senha
                </label>
                <div className="input-wrapper">
                  <Lock size={20} className="input-icon" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    placeholder="Repita sua senha"
                    className="form-input"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="toggle-password"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Criando conta...</span>
                  </>
                ) : (
                  'Criar Conta'
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="link">
                  Fazer login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;