import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './config';
import { criarNovoUsuario } from './criarNovoUsuario';
import { getDocs, query, where } from 'firebase/firestore';
import { usersCollection } from './collections';


export async function resetPassword(email) {
  return auth.sendPasswordResetEmail(auth, email);
}

export async function cadastrarEmailSenha(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha);

  // Verifica se o usuário já existe na coleção de usuários
  const userExists = await verificarUsuarioExistente(resultado.user);
  // Cria um novo documento com as informações centrais do usuário recém-cadastrado, caso ele não exista
  if (!userExists) {
    await criarNovoUsuario(resultado.user);
  }

  return resultado.user;
}

export async function loginGoogle() {
  // Configurar como o login do google vai funcionar
  const provider = new GoogleAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  // Verifica se o usuário já existe na coleção de usuários
  const userExists = await verificarUsuarioExistente(resultado.user);
  // Cria um novo documento com as informações centrais do usuário recém-cadastrado, caso ele não exista
  if (!userExists) {
    await criarNovoUsuario(resultado.user);
  }

  return resultado.user;
}

export async function loginEmailSenha(email, senha) {
  // Vai realizar o login com uma conta de email já existente
  const resultado = await signInWithEmailAndPassword(auth, email, senha);

  // Verifica se o usuário já existe na coleção de usuários
  const userExists = await verificarUsuarioExistente(resultado.user);
  // Cria um novo documento com as informações centrais do usuário recém-cadastrado, caso ele não exista
  if (!userExists) {
    await criarNovoUsuario(resultado.user);
  }

  return resultado.user;
}

export async function loginFacebook() {
  const provider = new FacebookAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  // Verifica se o usuário já existe na coleção de usuários
  const userExists = await verificarUsuarioExistente(resultado.user);
  // Cria um novo documento com as informações centrais do usuário recém-cadastrado, caso ele não exista
  if (!userExists) {
    await criarNovoUsuario(resultado.user);
  }

  return resultado.user;
}

export async function loginGithub() {
  const provider = new GithubAuthProvider();
  const resultado = await signInWithPopup(auth, provider);

  // Verifica se o usuário já existe na coleção de usuários
  const userExists = await verificarUsuarioExistente(resultado.user);
  // Cria um novo documento com as informações centrais do usuário recém-cadastrado, caso ele não exista
  if (!userExists) {
    await criarNovoUsuario(resultado.user);
  }

  return resultado.user;
}

export async function logout() {
  // Deslogar o usuário atual do firebase
  await signOut(auth);
}

async function verificarUsuarioExistente(user) {
  const q = query(usersCollection, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
