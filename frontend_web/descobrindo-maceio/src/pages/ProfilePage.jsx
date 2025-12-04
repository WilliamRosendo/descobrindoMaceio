import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, LogOut, Trash2, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { authService } from '../services/auth.service';
import "../styles/profile.css";
import AppContext from '../context/AppContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser,logout } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    setFormData({
      nome: currentUser.nome,
      email: currentUser.email,
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.updateUser(user.id, formData);
      setUser({ ...user, ...formData });
      setSuccess('Perfil atualizado com sucesso!');
      setEditing(false);
    } catch (err) {
      setError(err.error || 'Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (passwordData.novaSenha !== passwordData.confirmarNovaSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (passwordData.novaSenha.length < 6) {
      setError('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authService.updateUser(user.id, { senha: passwordData.novaSenha });
      setSuccess('Senha alterada com sucesso!');
      setPasswordData({
        senhaAtual: '',
        novaSenha: '',
        confirmarNovaSenha: '',
      });
    } catch (err) {
      setError(err.error || 'Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await authService.deleteUser(user.id);
      logout();
      navigate('/');
    } catch (err) {
      setError(err.error || 'Erro ao deletar conta');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <div className="profile-avatar">
            <User size={48} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.nome}</h1>
            <p className="profile-email">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>

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

        <div className="profile-section">
          <div className="section-header">
            <h2 className="section-title">Informações Pessoais</h2>
            {!editing && (
              <button onClick={() => setEditing(true)} className="edit-btn">
                Editar
              </button>
            )}
          </div>

          <form onSubmit={handleUpdateProfile} className="profile-form">
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
                  className="form-input"
                  disabled={!editing}
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
                  className="form-input"
                  disabled={!editing}
                />
              </div>
            </div>

            {editing && (
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setFormData({ nome: user.nome, email: user.email });
                  }}
                  className="cancel-btn"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button type="submit" className="save-btn" disabled={loading}>
                  <Save size={20} />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="profile-section">
          <h2 className="section-title">Alterar Senha</h2>

          <form onSubmit={handleUpdatePassword} className="profile-form">
            <div className="form-group">
              <label htmlFor="senhaAtual" className="form-label">
                Senha Atual
              </label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="senhaAtual"
                  name="senhaAtual"
                  value={passwordData.senhaAtual}
                  onChange={handlePasswordChange}
                  className="form-input"
                  placeholder="Digite sua senha atual"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="novaSenha" className="form-label">
                Nova Senha
              </label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="novaSenha"
                  name="novaSenha"
                  value={passwordData.novaSenha}
                  onChange={handlePasswordChange}
                  className="form-input"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmarNovaSenha" className="form-label">
                Confirmar Nova Senha
              </label>
              <div className="input-wrapper">
                <Lock size={20} className="input-icon" />
                <input
                  type="password"
                  id="confirmarNovaSenha"
                  name="confirmarNovaSenha"
                  value={passwordData.confirmarNovaSenha}
                  onChange={handlePasswordChange}
                  className="form-input"
                  placeholder="Repita a nova senha"
                />
              </div>
            </div>

            <button type="submit" className="save-btn" disabled={loading}>
              <Save size={20} />
              <span>Alterar Senha</span>
            </button>
          </form>
        </div>

        <div className="profile-section danger-section">
          <h2 className="section-title">Zona de Perigo</h2>
          <p className="danger-text">
            Ao deletar sua conta, todos os seus dados serão permanentemente removidos.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="delete-btn"
          >
            <Trash2 size={20} />
            <span>Deletar Conta</span>
          </button>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Confirmar Exclusão</h3>
            <p className="modal-text">
              Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="modal-cancel"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
                className="modal-confirm"
                disabled={loading}
              >
                Deletar Conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;