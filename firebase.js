// ===== FIREBASE CONFIG & SHARED UTILS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB--8tf1AZWyuR0XbC-vGkbBQ1HwbqBcTA",
  authDomain: "mrbull-e2e64.firebaseapp.com",
  projectId: "mrbull-e2e64",
  storageBucket: "mrbull-e2e64.firebasestorage.app",
  messagingSenderId: "113835433005",
  appId: "1:113835433005:web:78d661334c776b73b1eca4"
};

export const app = initializeApp(firebaseConfig);
export const db  = getFirestore(app);

export const accRef  = collection(db, "games");
export const postRef = collection(db, "posts");
export const handoverRef = collection(db, "handovers");

// ── helpers ──
export function getToday() {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate());
}
export function getDaysLeft(exp) {
  const p = exp.split('-');
  return Math.round((new Date(+p[0], +p[1]-1, +p[2]) - getToday()) / 864e5);
}
export function getStatus(row) {
  if (!row.active) return 'Expired';
  const d = getDaysLeft(row.expired);
  if (d < 0)  return 'Expired';
  if (d <= 2) return 'Urgent';
  if (d <= 5) return 'Soon';
  return 'Active';
}
export function fmtDate(str) {
  const p = str.split('-');
  return p[2] + '/' + p[1] + '/' + p[0];
}
export function nowStr() {
  const n = new Date();
  return n.toLocaleDateString('vi-VN') + ' ' +
         n.toLocaleTimeString('vi-VN', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
}

export { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot };