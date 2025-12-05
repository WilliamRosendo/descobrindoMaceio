import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login:', { email, password });
    // lógica de login
  };

  const handleFacebookLogin = () => {
    console.log('Login com Facebook');
    // login com Facebook
  };

  const handleGoogleLogin = () => {
    console.log('Login com Google');
    // login com Google
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header com imagem de fundo */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800' }}
            style={styles.headerImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.9)', '#ffffff']}
            style={styles.gradient}
          />
        </View>

        {/* Card de Login */}
        <View style={styles.card}>
          <Text style={styles.title}>Descobrindo</Text>
          <Text style={styles.subtitle}>Maceió</Text>

          {/* Input de Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Input de Senha */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Divisor OU */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OU</Text>
            <View style={styles.divider} />
          </View>

          {/* Botões de Login Social */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIcon}>f</Text>
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <Text style={styles.socialButtonIconGoogle}>G</Text>
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
          </View>

          {/* Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity>
              <Text style={styles.linkText}>Primeiro acesso</Text>
            </TouchableOpacity>
            <Text style={styles.linkSeparator}>/</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  card: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    color: '#4A90E2',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '300',
    textAlign: 'center',
    color: '#4A90E2',
    marginBottom: 30,
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FAFAFA',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 15,
    color: '#999',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  socialButtonIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1877F2',
    marginRight: 8,
  },
  socialButtonIconGoogle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DB4437',
    marginRight: 8,
  },
  socialButtonText: {
    fontSize: 14,
    color: '#666',
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  linkText: {
    color: '#4A90E2',
    fontSize: 13,
  },
  linkSeparator: {
    color: '#999',
    marginHorizontal: 8,
  }
});

export default LoginScreen;