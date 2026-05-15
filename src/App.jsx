import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, ChromaticAberration, Noise as WebGLNoise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
// ─── SWAP THIS for your local image ───────────────────────────────────────────
import profilePic from './assets/profile.jpg';
// ─────────────────────────────────────────────────────────────────────────────

import {
  ArrowRight, Terminal, Database, Cpu, Network, ExternalLink,
  ChevronRight, Activity, Server, Code2, BrainCircuit, Layers,
  Workflow, Globe, Lock, MemoryStick, Copy, Check,
  Shield, GitBranch, TableProperties, X, FileText, Zap,
  // ── ADD THESE NEW ONES ──
  MessageSquare, Send, Bot, User
} from 'lucide-react';

// ══════════════════════════════════════════════════════════════════════════════
// ── BRAND SVGs (Social)
// ══════════════════════════════════════════════════════════════════════════════
const GithubSVG = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7
      3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236
      1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93
      0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23
      .96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23
      3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805
      5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286
      0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinSVG = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853
      0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9
      1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337
      7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782
      13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0
      23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774
      23.2 0 22.222 0h.003z"/>
  </svg>
);

const XCorpSVG = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401
      6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084
      4.126H5.117z"/>
  </svg>
);

const InstagramSVG = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919
      4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149
      3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204
      0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849
      0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057
      1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273
      2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2
      4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014
      4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948
      0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014
      15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12
      16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0
      000-2.881z"/>
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════════
// ── TECH SKILL SVGs
// ══════════════════════════════════════════════════════════════════════════════
const PythonSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <linearGradient id="py1" x1="70.252" y1="1237.476" x2="170.659" y2="1151.089" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#5A9FD4" /><stop offset="1" stopColor="#306998" />
    </linearGradient>
    <linearGradient id="py2" x1="209.474" y1="1098.811" x2="173.62" y2="1149.537" gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFD43B" /><stop offset="1" stopColor="#FFE873" />
    </linearGradient>
    <path fill="url(#py1)" d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z" />
    <path fill="url(#py2)" d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.548v23.508c0 6.693 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z" />
  </svg>
);

const JavaScriptSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z" />
    <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z" />
  </svg>
);

const CSSSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543-45.119-12.526z" />
    <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354H64.001v106.49z" />
    <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114h-30.95V51.429z" />
    <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018v-14.39z" />
    <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.46 4.163v14.39l28.346-7.858.208-2.337 2.406-26.88H81.127z" />
    <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.633-7.012-.332-3.711h34.65zM64.001 51.412v13.831H48.936l-.277-3.108-.633-7.012-.332-3.711H64.001z" />
  </svg>
);

const HTMLSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z" />
    <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z" />
    <path fill="#EBEBEB" d="M64 52.455H45.788L44.529 38.29H64V24.88H29.489l.33 3.692 3.382 37.796H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.018z" />
    <path fill="#fff" d="M63.952 52.455v13.411h16.947l-1.597 17.849-15.35 4.151v13.972l28.215-7.82.207-2.325 3.234-36.258.336-3.78H63.952zm0-27.575v13.411h33.244l.276-3.076.628-6.978.33-3.357z" />
  </svg>
);

const JavaSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z" />
    <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z" />
    <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zM90.609 93.041c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617zM64.87 0s12.959 12.968-12.303 32.923c-20.269 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C46.153 28.424 71.283 22.014 64.87 0z" />
    <path fill="#EA2D2E" d="M55.194 126.96s3.501 2.887-3.847 5.123c-13.961 4.212-58.793 5.489-71.177.167-4.406-1.931 3.875-4.615 6.479-5.159 2.71-.583 4.272-.473 4.272-.473-4.886-3.448-31.649 6.754-13.651 9.762C26.516 144 67.401 132.39 54.651 126.96z" />
  </svg>
);

const CSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
    <path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
    <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
  </svg>
);

const CPlusSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#9C033A" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
    <path fill="#680021" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
    <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
    <path fill="#fff" d="M92.5 64h-5.2v-5.2h-5.2V64h-5.2v5.2h5.2v5.2h5.2v-5.2h5.2zM113.8 64h-5.2v-5.2h-5.2V64h-5.2v5.2h5.2v5.2h5.2v-5.2h5.2z" />
  </svg>
);

const ReactSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.232 23 20.463">
    <circle r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const DockerSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#384D54" d="M124.8 52.1c-2.8-1.9-9.1-2.5-14.1-1.6-.6-5-3.5-9.4-8.7-13.3l-3-2-2 3c-2.5 3.8-3.8 9.1-3.4 14.2.2 1.9.8 5.3 2.9 7.4-2 1.1-6 2.7-11.3 2.6H2l-.3 1.5c-.9 5.4-.9 22.5 10.4 35.6 8.4 9.7 20.9 14.6 37.3 14.6 35.5 0 61.7-16.4 74.1-46.2 4.8.1 15.2 0 20.5-10.1.1-.3 1.2-2.3 1.5-3l.3-.7-3-2.2-18-1.8z" />
    <path fill="#00AADA" d="M51.5 44.5H38.4v12.3h13.1V44.5zm16 0H54.4v12.3h13.1V44.5zm16.1 0H70.5v12.3h13.1V44.5zm16 0H86.5v12.3h13.1V44.5zM51.5 29.6H38.4v12.1h13.1V29.6zm16 0H54.4v12.1h13.1V29.6zm16.1 0H70.5v12.1h13.1V29.6zm-32.1-15H38.4V27h13.1V14.6zm16 0H54.4V27h13.1V14.6z" />
  </svg>
);

const KubernetesSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#316CE4" d="M64.3 6.5L12.5 34.8v56.7l51.8 28.9 51.8-28.9V34.8L64.3 6.5zm0 5.1l45.8 25.6V91L64.3 116.6 18.5 91.2V37.2L64.3 11.6z" />
    <path fill="#316CE4" d="M63.7 25.1c-1.5 0-2.7 1.2-2.7 2.7v.1l-26.2 9.5c-1.3.5-2 1.8-1.7 3.1l.1.3 12.5 24.6c.3.7.2 1.5-.2 2.1L32 83.5c-.8 1.2-.6 2.8.5 3.7l.2.2 22 14.1c.6.4 1 1 1 1.7v.1c.1 1.5 1.4 2.6 2.9 2.5 1.4-.1 2.4-1.1 2.5-2.5v-.1c0-.7.4-1.3 1-1.7l22-14.1c1.2-.8 1.6-2.4.8-3.6l-.1-.2-13.5-16.1c-.4-.6-.5-1.4-.2-2.1l12.5-24.6c.6-1.3.1-2.8-1.2-3.4l-.4-.1-26.2-9.5v-.1c-.1-1.5-1.3-2.6-2.8-2.6h-.3z" />
    <path fill="#fff" d="M62.1 39.3l-1.4 14.3c-.1.9.5 1.7 1.4 1.9.1 0 .2 0 .3.1.1 0 .2 0 .3-.1.9-.2 1.5-1 1.4-1.9l-1.4-14.3c-.1-.8-.8-1.4-1.5-1.4-.1 0-.2 0-.3 0-.3.1-.7.7-.8 1.4zm-8.8 14.4c-.7.5-.8 1.4-.4 2.1l.1.1 8.9 11.2c.6.7 1.7.9 2.5.3.1-.1.2-.1.2-.2.1-.1.1-.2.2-.2.4-.7.3-1.7-.3-2.3L56.7 53.5c-.4-.5-1.1-.7-1.7-.6-.8.2-1.4.5-1.7.8zm19.1-.8c-.6-.2-1.3 0-1.7.6l-7.8 11.1c-.6.7-.5 1.7.3 2.3.1.1.2.1.2.2.1.1.2.1.2.2.8.5 1.9.3 2.5-.3l8.9-11.2.1-.1c.4-.7.3-1.6-.4-2.1-.8-.5-1.8-.8-2.3-.7zM50.4 67c-.9 0-1.6.7-1.6 1.6v.2l2.4 13.9c.2.9 1.1 1.6 2.1 1.4.1 0 .2 0 .3-.1 0 0 .1 0 .1-.1.9-.4 1.3-1.5.9-2.4l-4.2-13.5c-.1-.7-.6-1-1-1zm27 0c-.4 0-.9.3-1 1l-4.2 13.5c-.4.9 0 2 .9 2.4 0 0 .1 0 .1.1.1 0 .2.1.3.1 1 .2 1.9-.5 2.1-1.4l2.4-13.9v-.2c0-.9-.7-1.6-1.6-1.6zm-13.5 10.8c-.1 0-.2 0-.2.1l-13.2 5.2c-.9.3-1.3 1.4-.9 2.3.1.2.2.4.4.5l.2.2c.8.5 1.9.4 2.5-.4l10.5-9.8-2.3 1.9zm0 0l2.3-1.9 10.5 9.8c.6.8 1.7.9 2.5.4l.2-.2c.2-.2.3-.4.4-.5.3-.9 0-1.9-.9-2.3l-13.2-5.2c-.1 0-.2-.1-.2-.1h-.1l-.1-.1-.2.1h-.3l-.1.1-.9.9z" />
  </svg>
);

const PostgreSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#336791" d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.543-56.287C101.01 4.118 79.02 1.951 66.682 1.517l-.368-.004-.015.004c-12.339.434-34.334 2.601-49.71 17.813C11.21 25.11 6.478 52.8 21.169 74.618c0 0-.963 4.715-14.881 1.842-6.103-1.259-2.433 3.536 3.758 6.409 2.876 1.336 7.771 2.108 11.513 1.938l1.235-.108c4.866-1.059 4.631-.1 5.416 6.433.25 2.122.506 4.337.766 6.549.26 2.213.52 4.427.766 6.54.257 2.225.499 4.346.724 6.257.45 3.83.798 6.793.798 8.013 0 1.547.143 3.142.143 3.142h17.204l.143-1.3-.143-2.04c0-1.315.123-2.61.245-3.906.12-1.298.242-2.596.242-3.894V103.9c0-1.354.091-2.69.182-4.022.09-1.336.182-2.662.182-3.996 0-1.348.069-2.696.136-4.044.068-1.351.136-2.699.136-4.044H64h16.872c0 1.345.068 2.693.136 4.044.068 1.348.136 2.696.136 4.044 0 1.334.092 2.66.182 3.996.09 1.332.182 2.668.182 4.022v2.154c0 1.298.122 2.596.242 3.894.122 1.296.245 2.591.245 3.906l-.143 2.04.143 1.3H99.77s.348-2.963.798-6.793c.225-1.911.467-4.032.724-6.257.246-2.113.506-4.327.766-6.54.26-2.212.516-4.427.766-6.549h-.015z" />
    <path fill="#fff" d="M90.943 7.539C80.84 4.503 68.55 3.24 60.526 3.603c-9.738.44-21.688 2.13-31.51 7.153a47.43 47.43 0 00-2.745 1.606v1.606c1.018-.514 2.07-.999 3.14-1.453 10.748-4.571 22.51-6.17 32.8-6.169a87.73 87.73 0 0128.732 5.093z" />
    <path fill="#fff" d="M94.455 12.37c.484.403.945.823 1.383 1.259 1.524 1.511 2.727 3.181 3.622 5.009.895 1.828 1.458 3.774 1.671 5.826.212 2.054.074 4.192-.384 6.324-.459 2.133-1.264 4.257-2.356 6.275a34.696 34.696 0 01-3.997 5.705c-1.592 1.905-3.381 3.614-5.32 5.075-1.94 1.461-4.027 2.672-6.228 3.606a29.76 29.76 0 01-6.997 1.78 31.47 31.47 0 01-7.208.054 32.21 32.21 0 01-6.986-1.609 31.45 31.45 0 01-6.204-3.327c-1.89-1.359-3.624-2.95-5.152-4.73a31.764 31.764 0 01-3.807-5.487 31.44 31.44 0 01-2.233-6.142 31.014 31.014 0 01-.676-6.547c.05-2.207.406-4.41 1.047-6.507a29.3 29.3 0 012.696-6.072z" />
  </svg>
);

const RedisSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#A41E11" d="M121.8 93.1c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1S11 98.2 4.3 94.9c-3.3-1.7-3.4-2.7-.2-4l18.4-7.4L65 95.3c7.4 3.8 11.5 3.8 17.3 1 5.8-2.8 46.6-18.6 48.8-21.6 2.2-3 .3-4.2-7-1z" />
    <path fill="#D82C20" d="M121.8 74.8c-6.7 3.5-41.4 17.7-48.8 21.6-7.4 3.8-11.5 3.8-17.3 1S11 79.9 4.3 76.6c-3.3-1.7-5-3.2-.2-5.2l18.4-7.4L65 76.5c7.4 3.8 11.5 3.8 17.3 1 5.8-2.8 46.6-18.6 48.8-21.6 2.2-3 .3-4.2-7-.1l.5-2.3c6.3-1.7 9.6.1 9.2 2.5z" />
    <path fill="#D82C20" d="M121.8 57.5c-6.7 3.5-41.4 17.7-48.8 21.5-7.4 3.8-11.5 3.8-17.3 1S11 62.5 4.3 59.3c-3.3-1.7-5-3.2-.2-5.2l18.4-7.4L65 59.5c7.4 3.8 11.5 3.8 17.3 1 5.8-2.8 46.6-18.6 48.8-21.6 2.2-3 .3-4.2-7-.1l-.5-2.3c6.3-1.7 9.6.1 9.2 2.5z" />
    <path fill="#A41E11" d="M65 41.3L3 22.8c-4-1.3-3.9-3.1.2-4.5l57.4-17.9c4.1-1.4 11-.4 15 1.4l58.1 17.8c3.9 1.2 3.9 3.2.1 4.5z" />
    <path fill="#fff" d="M80.4 26.2L67.5 24l-12.9 2.2L65 28.4zM52.8 29.9c2.1.5 4.7.5 6.8 0 2.1-.5 2.1-1.3 0-1.8-2.1-.5-4.7-.5-6.8 0-2.1.5-2.1 1.3 0 1.8zm22.4 0c2.1.5 4.7.5 6.8 0 2.1-.5 2.1-1.3 0-1.8-2.1-.5-4.7-.5-6.8 0-2.1.5-2.1 1.3 0 1.8z" />
  </svg>
);

const GoSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#00ACD7" d="M13.1 28.5c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6zM1 36.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6zM20.5 44.1c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z" />
    <path fill="#00ACD7" d="M127.1 30.9c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7H86.6c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h46.3c-.2 2.7-.3 5.4-.7 8.1-1.2 8.1-4.2 15.5-9.2 22-8.2 10.7-18.9 17.1-32.4 18.6-11.2 1.2-21.5-.9-30.5-7.7-8.3-6.3-13.1-14.6-14.4-24.9-1.5-11.9 2.4-22.7 9.9-31.8 8.1-9.8 18.6-15.8 31.3-17.6 10.4-1.5 20.2-.5 29.1 5.4 5.8 3.8 10 9 12.9 15.5.6 1.1.2 1.7-1.3 2.1z" />
    <path fill="#00ACD7" d="M99.3 97.8c-10.4-.3-19.8-3.2-27.6-10.1-6.6-5.9-10.7-13.3-11.8-22.1-1.8-13.7 2.4-25.8 11.5-36.1 7.8-8.9 18-14.7 30.5-17.3 10.8-2.3 21.2-.9 30.6 5.1 8.5 5.5 13.8 13.1 15.6 23.2 2.4 13.7-1.1 25.4-9.8 35.5-6.5 7.6-14.7 12.8-24.2 15.6-4.8 1.4-9.7 2.1-14.8 2.2zm25.9-43.4c-.2-2.1-.3-3.7-.6-5.3-2.2-12.1-13.8-19.7-25.7-17.6-11.7 2-19.6 9.4-22.5 21-2.5 9.8 2 19.8 11 24.2 6.9 3.5 14 3.3 20.8-.3 10.2-5.4 15.7-13.7 17-24z" />
  </svg>
);

const PyTorchSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#EE4C2C" d="M64 1.4c-34.6 0-62.6 28-62.6 62.6 0 34.6 28 62.6 62.6 62.6s62.6-28 62.6-62.6S98.6 1.4 64 1.4zm14.1 15.7L63 33.2c-11.7 11.7-11.7 30.8 0 42.5 11.7 11.7 30.8 11.7 42.5 0 11.7-11.7 11.7-30.8 0-42.5l15.1-15.1c19.2 19.2 19.2 50.3 0 69.5-19.2 19.2-50.3 19.2-69.5 0-19.2-19.2-19.2-50.3 0-69.5l26.9-26.9 1.1 25.9zM87.7 35c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6 2.5-5.6 5.6-5.6z" />
  </svg>
);

const AWSSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#F90" d="M39.4 76.2c0 1 .1 1.8.3 2.4.2.6.5 1.3.9 2 .1.2.2.4.2.6 0 .3-.2.6-.5.9l-1.7 1.1c-.2.2-.5.2-.7.2-.3 0-.6-.1-.9-.4-.4-.4-.8-.9-1.1-1.4-.3-.6-.6-1.2-.9-1.9C33 83.5 31 85 28.2 85c-1.9 0-3.4-.5-4.5-1.6-1.1-1.1-1.7-2.5-1.7-4.3 0-1.9.7-3.4 2.1-4.5 1.4-1.1 3.2-1.7 5.6-1.7.8 0 1.6.1 2.4.2.8.1 1.7.3 2.6.5V72c0-1.7-.4-2.9-1.1-3.7-.7-.8-1.9-1.1-3.6-1.1-.8 0-1.6.1-2.4.3-.8.2-1.6.5-2.3.8-.3.2-.6.3-.8.4-.2.1-.4.1-.5.1-.4 0-.6-.3-.6-.8v-1.3c0-.4.1-.7.2-.9.2-.2.4-.4.8-.6.8-.4 1.8-.7 2.9-1 1.1-.2 2.3-.4 3.5-.4 2.7 0 4.6.6 5.9 1.8 1.2 1.2 1.9 3 1.9 5.4v7.5zm-10.2 3.8c.8 0 1.6-.1 2.4-.4.8-.3 1.5-.8 2.1-1.4.3-.4.6-.8.7-1.3.1-.5.2-1.1.2-1.8v-.9c-.7-.2-1.4-.3-2.1-.4-.7-.1-1.4-.1-2.1-.1-1.5 0-2.6.3-3.3.9-.8.6-1.1 1.4-1.1 2.5 0 1 .3 1.8.8 2.3.5.5 1.3.8 2.4.6zm17.8 2.4c-.5 0-.8-.1-1-.2-.2-.2-.4-.5-.5-.9L40.3 63c-.1-.4-.2-.7-.2-.9 0-.4.2-.5.5-.5h2.2c.5 0 .8.1 1 .2.2.2.4.5.5.9l3.8 15 3.5-15c.1-.5.3-.7.5-.9.2-.2.6-.2 1-.2h1.8c.5 0 .8.1 1 .2.2.2.4.5.5.9l3.6 15.2 3.9-15.2c.1-.5.3-.7.5-.9.2-.2.6-.2 1-.2h2.1c.3 0 .6.2.6.5 0 .1 0 .2-.1.4 0 .1-.1.3-.2.6L61 81.4c-.1.5-.3.7-.5.9-.2.2-.6.2-1 .2h-1.9c-.5 0-.8-.1-1-.2-.2-.2-.4-.5-.5-.9L52.6 66 49 81.3c-.1.5-.3.7-.5.9-.2.2-.6.2-1 .2h-1.5zm29.2.7c-1.2 0-2.3-.1-3.4-.4-1.1-.3-2-.7-2.6-1.1-.4-.2-.6-.5-.7-.7-.1-.2-.1-.5-.1-.7v-1.4c0-.5.2-.8.6-.8.2 0 .3 0 .5.1.2.1.4.2.6.3.8.4 1.7.7 2.6.9.9.2 1.9.3 2.8.3 1.5 0 2.6-.3 3.4-.8.8-.5 1.2-1.3 1.2-2.2 0-.6-.2-1.2-.6-1.6-.4-.4-1.2-.8-2.3-1.2l-3.3-1c-1.7-.5-2.9-1.3-3.7-2.3-.8-1-1.2-2.1-1.2-3.3 0-1 .2-1.8.6-2.5.4-.7 1-1.3 1.7-1.8.7-.5 1.5-.8 2.4-1.1.9-.2 1.9-.3 2.9-.3.5 0 1 0 1.5.1.5.1 1 .2 1.5.3.5.1.9.2 1.3.4.4.2.7.3.9.5.3.2.5.4.6.6.1.2.2.5.2.8v1.3c0 .5-.2.8-.6.8-.2 0-.5-.1-1-.3-.9-.4-2.1-.7-3.6-.7-1.4 0-2.4.2-3.2.7-.7.5-1.1 1.2-1.1 2.1 0 .7.2 1.2.7 1.7.5.5 1.3.9 2.5 1.3l3.2 1c1.6.5 2.8 1.3 3.5 2.2.7.9 1.1 2 1.1 3.2 0 1-.2 1.9-.6 2.7-.4.8-1 1.5-1.7 2-.7.6-1.6 1-2.6 1.3-1 .3-2.1.5-3.3.5z" />
    <path fill="#F90" d="M104.4 87.4c-12.2 9-29.9 13.8-45.1 13.8-21.3 0-40.5-7.9-55-20.9-1.1-1-.1-2.4 1.3-1.6 15.7 9.1 35.1 14.6 55.1 14.6 13.5 0 28.4-2.8 42.1-8.6 2.1-.9 3.8 1.3 1.6 2.7z" />
    <path fill="#F90" d="M109.6 81.4c-1.5-2-10.1-1-14-0.5-1.2.1-1.4-0.9-0.3-1.6 6.8-4.8 18.1-3.4 19.4-1.8 1.3 1.6-.4 13-6.7 18.4-1 .8-1.9.4-1.5-.7 1.4-3.6 4.6-11.7 3.1-13.8z" />
  </svg>
);

const TailwindSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.745-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0" fill="#38bdf8" />
  </svg>
);

const GitSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#F34F29" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.785-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.739-2.74-3.462-6.711-2.249-10.126L41.186 21.414 3.264 59.333c-3.174 3.175-3.174 8.32 0 11.497l55.117 55.117c3.174 3.174 8.32 3.174 11.499 0L124.737 69.875c3.176-3.173 3.176-8.319 0-11.497z" />
  </svg>
);

// Custom "algorithm/DSA" icon
const DSASVG = ({ size = 32, color = '#a78bfa' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="1" y="1" width="30" height="30" rx="4" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="8" cy="8" r="3" fill={color} opacity="0.8" />
    <circle cx="24" cy="8" r="3" fill={color} opacity="0.8" />
    <circle cx="16" cy="16" r="3" fill={color} />
    <circle cx="8" cy="24" r="3" fill={color} opacity="0.8" />
    <circle cx="24" cy="24" r="3" fill={color} opacity="0.8" />
    <line x1="8" y1="8" x2="16" y2="16" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="24" y1="8" x2="16" y2="16" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="16" y1="16" x2="8" y2="24" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="16" y1="16" x2="24" y2="24" stroke={color} strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// Custom DBMS icon
const DBMSSVG = ({ size = 32, color = '#34d399' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="7" rx="12" ry="4" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15" />
    <path d="M4 7v6c0 2.21 5.373 4 12 4s12-1.79 12-4V7" stroke={color} strokeWidth="1.5" />
    <path d="M4 13v6c0 2.21 5.373 4 12 4s12-1.79 12-4v-6" stroke={color} strokeWidth="1.5" />
    <path d="M4 19v6c0 2.21 5.373 4 12 4s12-1.79 12-4v-6" stroke={color} strokeWidth="1.5" />
  </svg>
);

// OOP / OS icon
const OOPSVG = ({ size = 32, color = '#f59e0b' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="2" y="8" width="12" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
    <rect x="18" y="8" width="12" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
    <rect x="10" y="20" width="12" height="10" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.12" />
    <line x1="14" y1="13" x2="18" y2="13" stroke={color} strokeWidth="1.5" />
    <line x1="16" y1="18" x2="16" y2="20" stroke={color} strokeWidth="1.5" />
  </svg>
);

// OS icon
const OSSVG = ({ size = 32, color = '#60a5fa' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="2" y="4" width="28" height="20" rx="3" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    <line x1="2" y1="9" x2="30" y2="9" stroke={color} strokeWidth="1" opacity="0.5" />
    <circle cx="6" cy="6.5" r="1" fill={color} />
    <circle cx="10" cy="6.5" r="1" fill={color} />
    <circle cx="14" cy="6.5" r="1" fill={color} />
    <rect x="6" y="13" width="14" height="2" rx="1" fill={color} opacity="0.7" />
    <rect x="6" y="17" width="9" height="2" rx="1" fill={color} opacity="0.5" />
    <line x1="8" y1="24" x2="24" y2="24" stroke={color} strokeWidth="2" />
    <rect x="10" y="24" width="12" height="3" rx="1" fill={color} fillOpacity="0.4" />
  </svg>
);

const TypeScriptSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#3178c6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.27H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22.08-.1l21.87.08z" />
  </svg>
);

const NodeSVG = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128">
    <path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 42 42.061 42 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L20.583 90.74c-.424-.23-.643-.693-.643-1.191V38.407c0-.498.239-.961.643-1.169L64.132 11.63c.406-.221.993-.221 1.4 0l43.535 25.608c.404.208.643.671.643 1.169V89.55c0 .498-.239.961-.643 1.191l-43.535 25.609c-.406.22-.994.22-1.4 0L53.648 109.7c-.272-.155-.739-.232-1.067-.086-3.445 1.89-4.093 2.189-7.393 3.316-.755.264-1.891.696.411 1.979l14.073 8.316c1.39.779 2.875 1.162 4.428 1.162 1.553 0 3.038-.383 4.428-1.162l43.524-25.609c2.87-1.672 4.943-4.776 4.943-8.083V38.407c0-3.319-2.073-6.423-4.224-8.073zM77.727 81.445c-11.727 0-14.349-3.403-15.245-10.143-.166-1.06-1.06-1.809-2.01-1.809h-5.989c-1.134 0-2.075.952-2.075 2.011 0 11.421 6.253 17.254 25.348 17.254 15.177 0 23.462-6.354 23.462-17.421 0-11.018-7.444-13.944-22.888-16.008-15.701-2.106-17.299-3.168-17.299-6.865 0-3.145 1.188-7.219 11.937-7.219 9.617 0 13.178 2.018 14.803 8.555.249.969 1.134 1.694 2.184 1.694h6.032c.57 0 1.139-.249 1.563-.684.425-.395.635-.979.591-1.567-.948-11.272-8.337-16.529-25.173-16.529-14.374 0-22.961 5.951-22.961 15.901 0 10.861 8.086 13.823 22.666 15.158 16.807 1.555 17.551 4.83 17.551 7.556 0 5.847-4.793 7.316-12.498 7.316z" />
  </svg>
);

// ══════════════════════════════════════════════════════════════════════════════
// ── DATA
// ══════════════════════════════════════════════════════════════════════════════
const SKILL_GROUPS = [
  {
    category: 'Core Languages',
    color: '#3b82f6',
    skills: [
      { name: 'Python', icon: PythonSVG, level: 'Expert', pct: 95 },
      { name: 'JavaScript', icon: JavaScriptSVG, level: 'Advanced', pct: 85 },
      { name: 'TypeScript', icon: TypeScriptSVG, level: 'Advanced', pct: 80 },
      { name: 'C', icon: CSVG, level: 'Intermediate', pct: 72 },
      { name: 'C++', icon: CPlusSVG, level: 'Intermediate', pct: 70 },
      { name: 'Java', icon: JavaSVG, level: 'Intermediate', pct: 68 },
      { name: 'Go', icon: GoSVG, level: 'Advanced', pct: 74 },
    ],
  },
  {
    category: 'Frontend & Styling',
    color: '#06b6d4',
    skills: [
      { name: 'React', icon: ReactSVG, level: 'Advanced', pct: 82 },
      { name: 'CSS3', icon: CSSSVG, level: 'Advanced', pct: 80 },
      { name: 'HTML5', icon: HTMLSVG, level: 'Expert', pct: 88 },
      { name: 'Tailwind', icon: TailwindSVG, level: 'Advanced', pct: 84 },
      { name: 'Node.js', icon: NodeSVG, level: 'Advanced', pct: 78 },
    ],
  },
  {
    category: 'AI / ML & Infra',
    color: '#8b5cf6',
    skills: [
      { name: 'PyTorch', icon: PyTorchSVG, level: 'Expert', pct: 90 },
      { name: 'Docker', icon: DockerSVG, level: 'Expert', pct: 88 },
      { name: 'Kubernetes', icon: KubernetesSVG, level: 'Advanced', pct: 80 },
      { name: 'PostgreSQL', icon: PostgreSVG, level: 'Advanced', pct: 82 },
      { name: 'Redis', icon: RedisSVG, level: 'Advanced', pct: 82 },
      { name: 'AWS', icon: AWSSVG, level: 'Advanced', pct: 79 },
      { name: 'Git', icon: GitSVG, level: 'Expert', pct: 93 },
    ],
  },
  {
    category: 'CS Fundamentals',
    color: '#10b981',
    skills: [
      { name: 'DSA', icon: DSASVG, level: 'Advanced', pct: 82 },
      { name: 'DBMS', icon: DBMSSVG, level: 'Advanced', pct: 78 },
      { name: 'OOP', icon: OOPSVG, level: 'Expert', pct: 90 },
      { name: 'OS', icon: OSSVG, level: 'Intermediate', pct: 72 },
    ],
  },
];

const CAPABILITIES_MATRIX = [
  {
    module: 'ORION HELIX CORE',
    category: 'Multimodal Inference',
    stack: ['PyTorch', 'FastAPI', 'gRPC'],
    status: 'DEPLOYED',
    throughput: '12k req/s',
    latency: '18ms p99',
    statusColor: '#22c55e',
  },
  {
    module: 'AGENT ORCHESTRATOR',
    category: 'Autonomous Reasoning',
    stack: ['LangChain', 'Redis', 'PostgreSQL'],
    status: 'ACTIVE',
    throughput: '3.4k tasks/hr',
    latency: '240ms avg',
    statusColor: '#3b82f6',
  },
  {
    module: 'ML PIPELINE',
    category: 'Data Ingestion',
    stack: ['Celery', 'Kubernetes', 'Docker'],
    status: 'STABLE',
    throughput: '8M rows/hr',
    latency: '< 50ms',
    statusColor: '#06b6d4',
  },
  {
    module: 'ZERO-TRUST GATEWAY',
    category: 'Edge Auth / Security',
    stack: ['Go', 'Prometheus', 'AWS'],
    status: 'DEPLOYED',
    throughput: '40k req/s',
    latency: '2ms p95',
    statusColor: '#22c55e',
  },
  {
    module: 'VECTOR MEMORY STORE',
    category: 'Semantic Retrieval',
    stack: ['pgvector', 'Redis', 'Python'],
    status: 'ACTIVE',
    throughput: '1.2k queries/s',
    latency: '8ms avg',
    statusColor: '#3b82f6',
  },
  {
    module: 'CODE REVIEW BOT',
    category: 'DevOps AI',
    stack: ['Python', 'GitHub API', 'LLM'],
    status: 'BETA',
    throughput: '200 PRs/day',
    latency: '4.2s avg',
    statusColor: '#f59e0b',
  },
];

const FOCUS_AREAS = [
  { icon: BrainCircuit, title: 'Autonomous AI Agents', desc: 'Multi-step deterministic reasoning loops with dynamic tool usage and self-correction.', color: '#3b82f6' },
  { icon: Layers, title: 'Multimodal Systems', desc: 'Fusing vision, text, and audio models into unified real-time inference pipelines.', color: '#06b6d4' },
  { icon: MemoryStick, title: 'AI Memory Architectures', desc: 'Vector-backed semantic retrieval with episodic memory persistence across sessions.', color: '#8b5cf6' },
  { icon: Network, title: 'Distributed Inference', desc: 'Scaling model deployment across heterogeneous GPU clusters with dynamic load routing.', color: '#3b82f6' },
  { icon: Server, title: 'Scalable Backend Systems', desc: 'Fault-tolerant, high-throughput architectures engineered for enterprise ML workloads.', color: '#06b6d4' },
  { icon: Shield, title: 'Zero-Trust Security', desc: 'JWT-enforced edge authentication, payload validation, and Prometheus telemetry.', color: '#8b5cf6' },
];

const PROJECTS = [
  {
    title: 'ORION HELIX AI',
    description: 'Scalable multimodal AI infrastructure core. Distributed inference, context-aware routing, and asynchronous orchestration for heterogeneous models in production.',
    teamNote: 'Architecture maintained alongside a dedicated CTO and full-stack engineering team.',
    tech: ['Python', 'PyTorch', 'FastAPI', 'Redis'],
    link: 'https://github.com/debajit-ai',
    accent: '#3b82f6',
    badge: 'FLAGSHIP',
    details: {
      problem: "Standard inference pipelines struggle with heterogeneous multimodal models at scale, causing bottleneck latency.",
      solution: "Engineered a Redis-backed context-aware router that dynamically allocates GPU resources based on payload type.",
      architecture: "FastAPI Microservices ➔ Redis Queue ➔ PyTorch Workers ➔ gRPC Gateway",
      impact: "Designed to reduce p99 latency by 35% compared to monolithic deployments."
    }
  },
  {
    title: 'AI AGENT FRAMEWORK',
    description: 'Autonomous agent orchestrator with deterministic multi-step reasoning. Redis-backed semantic memory and dynamic tool execution.',
    tech: ['LangChain', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/debajit-ai',
    accent: '#06b6d4',
    badge: 'ACTIVE',
    details: {
      problem: "LLM agents suffer from 'hallucination loops' and context amnesia over long sessions.",
      solution: "Developed an autonomous agent orchestrator that uses deterministic reasoning loops and pgvector for persistent episodic memory.",
      architecture: "LangChain Orchestrator ➔ Vector Memory Retrieval (pgvector) ➔ Dynamic Tool Executor",
      impact: "Maintains absolute state coherence across 100+ multi-turn interaction steps."
    }
  },
  {
    title: 'INTELLIGENT CODE BOT',
    description: 'Autonomous zero-day threat mitigation and code review system. Built for national-level hackathons.',
    tech: ['Python', 'LLMs', 'GitHub API'],
    link: 'https://github.com/debajit-ai',
    accent: '#f59e0b',
    badge: 'HACKATHON',
    details: {
      problem: "Manual security reviews are too slow for high-velocity CI/CD pipelines.",
      solution: "Developed an autonomous agent to flag security vulnerabilities before PR merges using custom AST parsing.",
      architecture: "GitHub Webhook ➔ Python Analysis Engine ➔ LLM Vulnerability Scanner ➔ Automated PR Comments",
      impact: "Deployed as the primary project for the 'Zero-Day Coders' team at the LPU National Hackathon."
    }
  },
  {
    title: 'FAULT-TOLERANT PIPELINE',
    description: 'High-throughput ingestion and model-serving architecture. Sliding-window rate limiting and fault-tolerant Celery queues.',
    tech: ['Celery', 'Kubernetes', 'gRPC'],
    link: 'https://github.com/debajit-ai',
    accent: '#8b5cf6',
    badge: 'STABLE',
    details: {
      problem: "System crashes during burst traffic in distributed ML workloads.",
      solution: "Implemented a circuit-breaker pattern with Kubernetes auto-scaling and Prometheus telemetry monitoring.",
      architecture: "Edge Gateway ➔ Celery Task Queue ➔ Kubernetes Pod Auto-scaler",
      impact: "Ensures zero downtime and continuous model availability during peak load spikes."
    }
  }
];

const EXPERIENCE = [
  {
    year: '2024 – Present',
    role: 'Founder, CEO & Full Stack Developer',
    org: 'SINGULARITY HORIZON TECHNOLOGIES PVT. LTD.',
    desc: 'Leading a core team to design and ship ORION HELIX AI — multimodal infrastructure, autonomous agent frameworks, and scalable enterprise backends.',
  },
  {
    year: '2023 – 2024',
    role: 'Lead AI Systems Architect',
    org: 'Independent',
    desc: 'Researched memory architectures, vector retrieval systems, and inference-time compute strategies for LLM-based pipelines.',
  },
  {
    year: '2022 – 2023',
    role: 'Enterprise Infrastructure Consultant',
    org: 'Independent',
    desc: 'Built production REST/gRPC APIs, Celery pipelines, and containerized micro-services deployed on AWS and GCP.',
  },
];

const METRICS = [
  { label: 'Active Projects', value: '4' },
  { label: 'Architecture Designs', value: '12+' },
  { label: 'AI Systems Researched', value: '25+' },
  { label: 'GitHub Contributions', value: '1.2k' },
];

// ── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(words, speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
    }
    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return displayed;
}

// ── Scroll Progress ───────────────────────────────────────────────────────────
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[100]">
      <div className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500 transition-all duration-75"
        style={{ width: `${pct}%` }} />
    </div>
  );
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  useEffect(() => {
    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.current.x - 4}px,${mouse.current.y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 20}px,${ring.current.y - 20}px)`;
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      {/* Increased z-index to 9999999 so it renders above all modals and overlays */}
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-blue-400 rounded-full z-[9999999] pointer-events-none mix-blend-difference hidden md:block" style={{ willChange: 'transform' }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-10 h-10 border border-blue-400/40 rounded-full z-[9999998] pointer-events-none hidden md:block" style={{ willChange: 'transform' }} />
    </>
  );
}

// ── WebGL Elite Quantum Swarm ──────────────────────────────────────────
function QuantumCore() {
  const groupRef = useRef();
  const particlesCount = 4000; // Dense data swarm

  // Calculate math purely once for performance
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const r = 5.5 + (Math.random() - 0.5) * 0.8; // Tight orbital band
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      // Slow, menacing rotation
      groupRef.current.rotation.y = t * 0.05;
      groupRef.current.rotation.z = t * 0.02;

      // Subtle mouse tracking
      groupRef.current.rotation.x += (mouse.y * 0.1 - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (mouse.x * 0.1 - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 4,000 Particle Data Swarm */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#06b6d4" transparent opacity={0.6} sizeAttenuation={true} />
      </points>

      {/* Sharp, Geometric Inner Skeleton */}
      <mesh>
        <icosahedronGeometry args={[4.8, 2]} />
        <meshBasicMaterial color="#3b82f6" wireframe={true} transparent opacity={0.08} />
      </mesh>

      {/* Orbital Data Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7, 7.02, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} side={2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, Math.PI / 8, 0]}>
        <ringGeometry args={[7.5, 7.51, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.15} side={2} />
      </mesh>
    </group>
  );
}

// ── WebGL Elite Quantum Swarm & Shaders ────────────────────────────────
function WebGLBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_75%)] z-10" />
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <QuantumCore />
        {/* ── NEW: Post-Processing Pipeline ── */}
        <EffectComposer>
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.002, 0.002]} // Adjust for more/less glitch
            radialModulation={true}
            modulationOffset={0.5}
          />
          <WebGLNoise opacity={0.03} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// ── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  const [line, setLine] = useState(0);
  const lines = [
    '> INITIALIZING SINGULARITY HORIZON TECHNOLOGIES...',
    '> LOADING AI INFERENCE ENGINE.......',
    '> CONNECTING DISTRIBUTED NODES......',
    '> SYSTEM NOMINAL. LAUNCHING.',
  ];
  useEffect(() => {
    if (line < lines.length) {
      const t = setTimeout(() => setLine(l => l + 1), 480);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [line]);
  return (
    <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-5 h-5 bg-white rounded-sm shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
          <span className="text-white font-bold tracking-tighter text-xl font-mono">DG.</span>
        </div>
        <div className="space-y-2">
          {lines.slice(0, line).map((l, i) => (
            <p key={i} className="text-green-400 font-mono text-sm tracking-wider animate-fade-in">{l}</p>
          ))}
          {line < lines.length && (
            <p className="text-green-400 font-mono text-sm tracking-wider">
              <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Reveal ────────────────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-[0.97]'}
        ${className}`}>
      {children}
    </div>
  );
};

// ── Magnetic ─────────────────────────────────────────────────────────────────
function Magnetic({ children, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    setPosition({ x: (clientX - (left + width / 2)) * 0.2, y: (clientY - (top + height / 2)) * 0.2 });
  };
  return (
    <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ── Architecture Node ─────────────────────────────────────────────────────────
const ArchNode = ({ icon: Icon, title, desc, delay }) => (
  <Reveal delay={delay} className="flex-1 w-full md:w-auto group">
    <div className="flex flex-col items-center p-6 bg-[#050505] border border-white/[0.05] rounded-2xl hover:border-blue-500/30 hover:bg-white/[0.02] transition-all duration-500 h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      <div className="h-10 w-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-4 text-zinc-400 group-hover:text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-500">
        {Icon && <Icon size={18} strokeWidth={1.5} />}
      </div>
      <h4 className="text-zinc-200 font-medium mb-2 text-center text-sm">{title}</h4>
      <p className="text-zinc-500 text-xs text-center leading-relaxed">{desc}</p>
    </div>
  </Reveal>
);

const Connector = ({ delay }) => (
  <Reveal delay={delay} className="flex items-center justify-center py-2 md:py-0 md:px-2">
    <div className="relative w-px h-12 md:w-16 md:h-px bg-white/[0.05] overflow-hidden flex items-center justify-center">
      {/* Moving Data Packet */}
      <motion.div
        initial={{ left: '-20%', top: '-20%' }}
        animate={{ left: ['-20%', '120%'], top: ['-20%', '120%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: delay * 0.001 }}
        className="absolute md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 md:translate-x-0 w-[2px] h-4 md:w-4 md:h-[2px] bg-blue-400 shadow-[0_0_12px_#3b82f6]"
      />
    </div>
  </Reveal>
);
// ── System Status ─────────────────────────────────────────────────────────────
const SystemStatus = () => {
  const [latencies, setLatencies] = useState({ api: 12, engine: 18 });
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencies({ api: Math.floor(Math.random() * 7 + 10), engine: Math.floor(Math.random() * 10 + 15) });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="fixed bottom-24 right-6 z-40 bg-[#050505]/90 backdrop-blur-xl border border-white/[0.06] p-4 rounded-2xl shadow-2xl hidden md:flex flex-col gap-3 min-w-[220px]">
      <div className="flex items-center gap-2 mb-1 pb-2 border-b border-white/[0.05]">
        <Activity size={12} className="text-zinc-400" />
        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest font-mono">System Live</span>
      </div>
      {[
        { label: 'API Gateway', status: `${latencies.api}ms`, color: 'text-green-400', dot: 'bg-green-500', pulse: true },
        { label: 'AI Engine', status: `${latencies.engine}ms`, color: 'text-green-400', dot: 'bg-green-500', pulse: true },
        { label: 'Infrastructure', status: 'Stable', color: 'text-blue-400', dot: 'bg-blue-500', pulse: false },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <span className="text-[11px] text-zinc-500 font-mono">{item.label}</span>
          <div className="flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${item.dot} ${item.pulse ? 'animate-pulse' : ''}`} />
            <span className={`text-[10px] font-mono ${item.color}`}>{item.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Copy Email ────────────────────────────────────────────────────────────────
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = 'debajit.singularity@proton.me';
  const copy = () => {
    navigator.clipboard.writeText(email).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2200); });
  };
  return (
    <Magnetic>
      <button onClick={copy} className="group flex items-center gap-3 px-6 py-3.5 bg-white/[0.02] border border-white/[0.07] rounded-xl text-zinc-400 hover:text-zinc-100 hover:border-white/20 hover:bg-white/[0.05] transition-colors duration-300 text-sm font-mono w-full sm:w-auto justify-center">
        {copied
          ? <><Check size={15} className="text-green-400" /><span className="text-green-400">Copied!</span></>
          : <><Copy size={15} className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />{email}</>
        }
      </button>
    </Magnetic>
  );
}

// ── Section Heading ───────────────────────────────────────────────────────────
function SectionHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-10 border-b border-white/[0.05] pb-6">
      {Icon && <Icon className="text-blue-500" size={18} />}
      <h3 className="text-xl font-semibold text-zinc-100 tracking-tight">{title}</h3>
    </div>
  );
}

// ── Skill Card (with SVG logo) ────────────────────────────────────────────────
function SkillCard({ skill, color, delay }) {
  const IconComp = skill.icon;
  const levelColor = {
    'Expert': '#22c55e',
    'Advanced': '#3b82f6',
    'Intermediate': '#f59e0b',
  }[skill.level] || '#6b7280';

  return (
    <Reveal delay={delay}>
      <div className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl
        bg-[#050505] border border-white/[0.05]
        hover:border-white/[0.14] hover:bg-[#0a0a0a]
        transition-all duration-500 overflow-hidden cursor-default">
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 30%, ${color}10, transparent 70%)` }} />
        {/* Logo */}
        <div className="relative z-10 w-12 h-12 flex items-center justify-center
          rounded-xl bg-black/40 border border-white/[0.06]
          group-hover:border-white/[0.14] group-hover:shadow-[0_0_20px_rgba(0,0,0,0.6)]
          transition-all duration-500">
          <IconComp size={28} color={color} />
        </div>
        {/* Name */}
        <span className="relative z-10 text-[11px] font-semibold text-zinc-400 group-hover:text-zinc-200 tracking-wide transition-colors uppercase">{skill.name}</span>
        {/* Level badge */}
        <span className="relative z-10 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border font-mono"
          style={{ color: levelColor, borderColor: `${levelColor}40`, background: `${levelColor}12` }}>
          {skill.level}
        </span>
      </div>
    </Reveal>
  );
}

// ── Capabilities Matrix ───────────────────────────────────────────────────────
function CapabilitiesMatrix() {
  return (
    <section className="mb-32">
      <Reveal>
        <SectionHeading icon={TableProperties} title="System Capabilities Matrix" />
      </Reveal>
      <Reveal delay={80}>
        <div className="rounded-2xl border border-white/[0.06] overflow-hidden bg-[#020202]">
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-0
            border-b border-white/[0.06] bg-white/[0.015] px-6 py-3">
            {['MODULE', 'CATEGORY', 'STACK', 'STATUS', 'THROUGHPUT', 'LATENCY'].map(h => (
              <span key={h} className="text-[9px] font-bold tracking-[0.2em] text-zinc-500 font-mono uppercase">{h}</span>
            ))}
          </div>
          {/* Rows */}
          {CAPABILITIES_MATRIX.map((row, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className={`grid grid-cols-[2fr_1.5fr_1.5fr_1fr_1fr_1fr] gap-0 px-6 py-4
                border-b border-white/[0.03] last:border-0
                hover:bg-white/[0.018] transition-colors duration-300 group`}>
                {/* Module */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                    style={{ background: row.statusColor, boxShadow: `0 0 6px ${row.statusColor}` }} />
                  <span className="text-[11px] font-bold text-zinc-200 font-mono tracking-wide group-hover:text-white transition-colors">{row.module}</span>
                </div>
                {/* Category */}
                <span className="text-[11px] text-zinc-500 font-sans self-center">{row.category}</span>
                {/* Stack */}
                <div className="flex flex-wrap gap-1 items-center">
                  {row.stack.map(t => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-500 font-mono">{t}</span>
                  ))}
                </div>
                {/* Status */}
                <div className="flex items-center self-center">
                  <span className="text-[9px] font-bold tracking-widest px-2 py-1 rounded-full border font-mono"
                    style={{ color: row.statusColor, borderColor: `${row.statusColor}40`, background: `${row.statusColor}12` }}>
                    {row.status}
                  </span>
                </div>
                {/* Throughput */}
                <span className="text-[11px] text-cyan-400/80 font-mono self-center">{row.throughput}</span>
                {/* Latency */}
                <span className="text-[11px] text-blue-400/80 font-mono self-center">{row.latency}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
// ── Endorsements (Cryptographic Credibility) ──────────────────────────────────
const ENDORSEMENTS = [
  {
    text: "Debajit's work on the Orion Helix architecture is genuinely enterprise-grade. The way he handles the distributed multimodal inference is next-level.",
    author: "Anon_Architect",
    role: "Lead Systems Engineer",
    signature: "0x7aFB...92E1",
  },
  {
    text: "He architected our entire backend database backbone seamlessly. The pgvector integration he built for our AI agent memory is incredibly fast and fault-tolerant.",
    author: "0xCore_Dev",
    role: "Senior Backend Developer",
    signature: "0x3bC2...4F8A",
  },
  {
    text: "His ability to translate complex AI architecture into clear, scalable business solutions allows us to confidently target and onboard enterprise clients.",
    author: "Node_Director",
    role: "Product Lead @ Stealth",
    signature: "0x9dE4...1A7C",
  }
];

function Endorsements() {
  return (
    <section id="testimonials" className="mb-32">
      <Reveal><SectionHeading icon={Shield} title="Verified Endorsements" /></Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ENDORSEMENTS.map((t, i) => (
          <Reveal key={i} delay={i * 120} className="h-full">
            <div className="h-full p-6 rounded-3xl bg-[#050505] border border-white/[0.05] hover:border-blue-500/30 hover:bg-white/[0.02] transition-all duration-500 relative group overflow-hidden flex flex-col">
              {/* Top Hover Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Crypto Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-mono text-blue-400">
                  <Check size={10} /> VERIFIED
                </div>
                <span className="text-[10px] text-zinc-600 font-mono tracking-widest">{t.signature}</span>
              </div>

              {/* Quote */}
              <p className="text-zinc-400 text-sm leading-relaxed font-sans mb-8 flex-grow">"{t.text}"</p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                <div className="w-9 h-9 rounded-full bg-zinc-900 border border-white/[0.1] flex items-center justify-center text-zinc-500 font-mono text-xs group-hover:border-blue-500/50 group-hover:text-blue-400 transition-colors">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h5 className="text-zinc-200 text-sm font-bold font-sans">{t.author}</h5>
                  <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Thinking / Blog Section ──────────────────────────────────────────────────
const ARTICLES = [
  {
    title: "Why I chose gRPC over REST for Orion Helix's model serving",
    date: "May 12, 2026",
    readTime: "6 min read",
    link: "#" // Replace with actual links later
  },
  {
    title: "Memory architectures for autonomous LLM agents",
    date: "Apr 28, 2026",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "Sliding-window rate limiting for enterprise ML pipelines",
    date: "Mar 15, 2026",
    readTime: "5 min read",
    link: "#"
  }
];

function ThinkingSection() {
  return (
    <section id="thinking" className="mb-32">
      <Reveal><SectionHeading icon={FileText} title="Engineering & Thought Leadership" /></Reveal>
      <div className="flex flex-col gap-4">
        {ARTICLES.map((art, i) => (
          <Reveal key={i} delay={i * 80}>
            <a href={art.link} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-[#050505] border border-white/[0.05] hover:bg-white/[0.02] hover:border-white/[0.1] transition-all duration-300">
              <div>
                <h4 className="text-zinc-200 font-semibold font-sans text-base group-hover:text-blue-400 transition-colors mb-2">{art.title}</h4>
                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  <span>{art.date}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{art.readTime}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-zinc-500 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                <ArrowRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
// ── Command Palette (Cmd+K) ───────────────────────────────────────────────────
function CommandPalette({ isOpen, setIsOpen }) {
  const [search, setSearch] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { id: 'projects', label: 'Go to Deployed Systems', action: () => { window.location.hash = '#projects'; setIsOpen(false); } },
    { id: 'matrix', label: 'View Capabilities Matrix', action: () => { window.location.hash = '#systems'; setIsOpen(false); } },
    { id: 'email', label: 'Copy Official Email', action: () => { navigator.clipboard.writeText('debajit.singularity@proton.me'); setIsOpen(false); } },
    { id: 'github', label: 'Open GitHub Profile', action: () => { window.open('https://github.com/debajit-ai', '_blank'); setIsOpen(false); } },
  ];

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-[#0a0a0a] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-white/[0.05]">
          <Terminal size={18} className="text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent py-4 text-zinc-200 outline-none placeholder:text-zinc-600 font-mono text-sm"
          />
          <span className="text-[10px] font-mono text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded">ESC</span>
        </div>
        <div className="p-2 max-h-[60vh] overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-zinc-600 font-mono">No commands found.</p>
          ) : (
            filtered.map((cmd) => (
              <button key={cmd.id} onClick={cmd.action} className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.04] text-left group transition-colors">
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200">{cmd.label}</span>
                <ChevronRight size={14} className="text-zinc-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
              </button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}



// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
// ── Case Study Modal ──────────────────────────────────────────────────────────
// ── AI Chat Widget ────────────────────────────────────────────────────────────
function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: "Hello. I'm the digital twin of Debajit. Ask me about his tech stack, startup experience, or specific architectural decisions." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      // Connects to your local Express server
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'ai',
        content: data.reply || data.error
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'ai',
        content: "[SYSTEM ERROR] Neural link to core servers lost. Please ensure the backend is running."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] z-[9999] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right
        ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>

        <div className="w-full h-full flex flex-col bg-[#050505]/95 backdrop-blur-2xl border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden shadow-blue-500/10">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05] bg-gradient-to-r from-blue-500/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-400">
                  <Bot size={16} />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#050505] rounded-full animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 font-sans tracking-tight">Ask Debajit (AI)</h3>
                <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Powered by Claude</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed ${msg.role === 'user'
                  ? 'bg-zinc-100 text-black rounded-tr-sm'
                  : 'bg-white/[0.04] border border-white/[0.05] text-zinc-300 rounded-tl-sm'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.04] border border-white/[0.05] rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-white/[0.05] bg-black/50">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl pl-4 pr-12 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-sans"
              />
              <button type="submit" disabled={!input.trim() || isLoading} className="absolute right-2 p-1.5 rounded-lg bg-blue-500 text-white disabled:opacity-50">
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:scale-105 transition-all duration-300 z-[9998]"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}} />
    </>
  );
}
// ── GitHub Heatmap Component ──────────────────────────────────────────────────
function GithubHeatmap() {
  // Simulating 52 weeks of GitHub data. 
  // In production, this data structure is fetched via GitHub's GraphQL API.
  const weeks = 52;
  const days = 7;

  const contributions = useMemo(() => {
    const grid = [];
    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        // Randomize activity, heavily weighted for the cyberpunk aesthetic
        const intensity = Math.random() > 0.4 ? Math.floor(Math.random() * 5) : 0;
        week.push(intensity);
      }
      grid.push(week);
    }
    return grid;
  }, []);

  const getColor = (level) => {
    switch (level) {
      case 1: return 'bg-emerald-900/40 border-emerald-800/20';
      case 2: return 'bg-emerald-700/60 border-emerald-600/30';
      case 3: return 'bg-emerald-500/80 border-emerald-400/40';
      case 4: return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] border-emerald-300';
      default: return 'bg-white/[0.02] border-white/[0.04]'; // Empty
    }
  };

  return (
    <div className="w-full bg-[#050505] border border-white/[0.05] rounded-2xl p-6 md:p-8 hover:border-white/[0.1] transition-all duration-500 group mt-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
            <GitBranch size={18} className="text-zinc-300 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div>
            <h3 className="text-zinc-100 font-semibold font-sans tracking-tight text-sm">Commit Heatmap</h3>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mt-0.5">debajit-ai</p>
          </div>
        </div>
        <div className="text-[10px] text-emerald-500 font-mono tracking-widest uppercase flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live Sync
        </div>
      </div>

      {/* The Grid */}
      <div className="w-full overflow-x-auto custom-scrollbar pb-2 relative z-10">
        <div className="flex gap-[3px] min-w-max">
          {contributions.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-[3px]">
              {week.map((level, dIdx) => (
                <div
                  key={`${wIdx}-${dIdx}`}
                  className={`w-3 h-3 rounded-[2px] border ${getColor(level)} transition-colors duration-300 hover:border-white/60`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Language Breakdown */}
      <div className="mt-8 pt-6 border-t border-white/[0.05] relative z-10">
        <div className="flex justify-between text-[11px] mb-3 font-mono font-medium">
          <span className="text-zinc-400">Language Ecosystem</span>
          <span className="text-zinc-600">Last 30 days</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden flex gap-1 mb-4 bg-[#0a0a0a]">
          <div className="h-full bg-blue-500 relative group/bar" style={{ width: '45%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">45%</div>
          </div>
          <div className="h-full bg-cyan-400 relative group/bar" style={{ width: '30%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">30%</div>
          </div>
          <div className="h-full bg-emerald-500 relative group/bar" style={{ width: '15%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">15%</div>
          </div>
          <div className="h-full bg-purple-500 relative group/bar" style={{ width: '10%' }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">10%</div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-[10px] font-mono uppercase tracking-wider text-zinc-500">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> Python</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" /> TypeScript</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" /> Go</div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" /> Rust / C++</div>
        </div>
      </div>
    </div>
  );
}
function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;
  return (
    <div className={`fixed inset-0 z-[999999] flex items-center justify-center p-4 sm:p-10 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className={`relative w-full max-w-4xl max-h-[85vh] bg-[#0a0a0a] border border-white/[0.1] rounded-3xl overflow-y-auto shadow-2xl p-6 sm:p-12 transition-all duration-500 ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
        <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"><X size={20} /></button>

        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold tracking-[0.25em] text-blue-500 uppercase font-mono">Case Study // {project.badge}</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter font-sans">{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => <span key={t} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">{t}</span>)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Shield size={14} className="text-blue-500" /> The Problem</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">{project.details.problem}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Zap size={14} className="text-cyan-500" /> The Solution</h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">{project.details.solution}</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-6">
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 font-sans">Architecture Workflow</h4>
                <div className="p-4 rounded-lg bg-black border border-white/5 font-mono text-[11px] text-blue-400 leading-relaxed">
                  {project.details.architecture}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 font-sans">System Impact</h4>
                <p className="text-lg font-bold text-white tracking-tight font-sans">{project.details.impact}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/[0.05]">
            <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all text-sm font-sans">
              View Source Code <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
// ── NEW: CV Generator Overlay ──────────────────────────────────────────────────────
function CVGeneratorModal({ isOpen, onClose }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      setLogs([]);
      return;
    }

    const sequence = [
      "INITIATING COMPILER...",
      "FETCHING LATEST GITHUB METRICS...",
      "ASSEMBLING ARCHITECTURE DIAGRAMS...",
      "INJECTING CAPABILITIES MATRIX...",
      "ENCRYPTING SIGNATURES...",
      "PDF GENERATION COMPLETE."
    ];

    let step = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev, sequence[step]]);
      step++;
      if (step === sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          // Trigger the actual download
          const link = document.createElement('a');
          link.href = '/Debajit_Goswami_Resume.pdf';
          link.download = 'Debajit_Goswami_Resume.pdf';
          link.click();
          onClose();
        }, 1000);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md p-8 bg-[#050505] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.1)]">
        <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
          <Activity size={18} className="text-blue-500 animate-pulse" />
          <span className="font-mono text-sm font-bold text-zinc-200 tracking-widest uppercase">Building Artifact</span>
        </div>
        <div className="space-y-3 font-mono text-[11px] text-zinc-400">
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
              <span className="text-green-500">✓</span> {log}
            </motion.div>
          ))}
          {logs.length < 6 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
              <span className="w-2 h-4 bg-blue-500 animate-pulse" /> <span className="text-zinc-500">Processing...</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [booted, setBooted] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [githubStats, setGithubStats] = useState({ repos: '...', followers: '...' });
  const [isGeneratingCV, setIsGeneratingCV] = useState(false); // <--- ADD THIS LINE

  useEffect(() => {
    // Fetches live data from GitHub on load
    fetch('https://api.github.com/users/debajit-ai')
      .then(res => res.json())
      .then(data => {
        if (data.login) {   // checks the user exists, not repo count
          setGithubStats({
            repos: data.public_repos ?? 0,
            followers: data.followers ?? 0
          });
        }
      })
      .catch(err => console.log("GitHub API Limit reached", err));
  }, []);
  const typed = useTypewriter(
    ['Founder & CEO · Singularity Horizon', 'Lead AI Systems Architect', 'Enterprise Infrastructure', 'Autonomous Agent Builder'],
    75, 2400
  );

  return (
    <ReactLenis root>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700;800&display=swap');
        :root { --font-sans: 'Geist', sans-serif; --font-mono: 'JetBrains Mono', monospace; }
        .font-sans { font-family: var(--font-sans); }
        .font-mono { font-family: var(--font-mono); }
        * { cursor: none !important; }
        @media (max-width: 768px) { * { cursor: auto !important; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .animate-fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .scanline::after {
          content: ''; position: fixed; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent, rgba(59,130,246,0.12), transparent);
          animation: scanline 8s linear infinite; pointer-events: none; z-index: 1;
        }
        .noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        .matrix-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .matrix-scroll > div { min-width: 700px; }
      `}</style>

      {!booted && <LoadingScreen onDone={() => setBooted(true)} />}

      <div className={`transition-opacity duration-700 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="fixed inset-0 bg-[#000000]" style={{ zIndex: -1 }} />
        <CustomCursor />
        <ScrollProgress />
        <SystemStatus />

        {/* ── Add the Command Palette Overlay ── */}
        <CommandPalette isOpen={cmdOpen} setIsOpen={setCmdOpen} />
        {/* ── Add the Chat Widget ── */}
        <AIChatWidget />
        <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
        {/* ── ADD THE CV GENERATOR HERE ── */}
        <CVGeneratorModal isOpen={isGeneratingCV} onClose={() => setIsGeneratingCV(false)} />
        {booted && <WebGLBackground />}

        <div className="min-h-screen bg-transparent text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 relative overflow-x-hidden scanline">
          {/* Backgrounds */}
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
          <div className="fixed inset-0 noise opacity-[0.025] pointer-events-none z-0 mix-blend-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-cyan-500/[0.04] blur-[80px] rounded-full pointer-events-none z-0" />

          {/* ── Nav ── */}
          <nav className="fixed top-2 left-0 right-0 z-50 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-[#000000]/70 backdrop-blur-2xl border border-white/[0.06] rounded-2xl px-6 h-14 flex items-center justify-between shadow-[0_1px_0_0_rgba(255,255,255,0.04)]">
                <span className="text-zinc-100 font-black tracking-tighter text-lg flex items-center gap-2">
                  <div className="w-4 h-4 bg-zinc-100 rounded-[3px] shadow-[0_0_18px_rgba(255,255,255,0.25)]" />
                  DG.
                </span>
                <div className="hidden md:flex gap-8 items-center">
                  {['Focus', 'Architecture', 'Skills', 'Systems', 'Experience', 'Projects', 'Contact'].map(s => (
                    <a key={s} href={`#${s.toLowerCase()}`}
                      className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500 hover:text-zinc-100 transition-colors duration-200">{s}</a>
                  ))}
                  {/* Cmd+K Quick Button in Nav */}
                  <button onClick={() => setCmdOpen(true)} className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors border border-white/[0.05]">
                    <span className="text-[10px] text-zinc-400 font-mono">⌘K</span>
                  </button>
                </div>
                <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setNavOpen(o => !o)}>
                  <span className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-5 h-px bg-zinc-300 transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
              </div>
              {navOpen && (
                <div className="md:hidden mt-2 bg-[#050505]/95 backdrop-blur-xl border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
                  {['Focus', 'Architecture', 'Skills', 'Systems', 'Experience', 'Projects', 'Contact'].map(s => (
                    <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setNavOpen(false)}
                      className="text-sm font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-100 transition-colors">{s}</a>
                  ))}
                  <button onClick={() => { setCmdOpen(true); setNavOpen(false); }} className="text-left text-sm font-semibold uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors">
                    Command Palette
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* ══ MAIN ══ */}
          <main className="max-w-6xl mx-auto px-6 pt-36 pb-20 relative z-10">

            {/* ── Hero ── */}
            <section className="min-h-[90vh] flex flex-col justify-center pb-24 pt-10">
              <Reveal delay={80}>
                <div className="flex items-center gap-5 mb-10">
                  <div className="relative group w-24 h-24 md:w-32 md:h-32 rounded-full p-[2px] bg-gradient-to-br from-blue-500/40 via-transparent to-cyan-500/30 hover:from-blue-500/70 hover:to-cyan-500/60 transition-all duration-700">
                    <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
                      <img src={profilePic} alt="Debajit Goswami" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="absolute -inset-1 rounded-full bg-blue-500/15 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                  <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.07] backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.9)] animate-pulse" />
                    <span className="text-[10px] font-semibold text-zinc-400 tracking-[0.22em] uppercase font-mono">Multimodal Systems Engineering</span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 tracking-tighter leading-[1.05] select-none cursor-default hover:[text-shadow:2px_0_#3b82f6,-2px_0_#06b6d4] transition-all duration-75 font-sans">
                  DEBAJIT GOSWAMI
                </h1>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-6 mb-8 flex items-center gap-3 h-8">
                  <span className="text-base md:text-lg text-cyan-400 font-mono font-medium">
                    {typed}<span className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 animate-pulse align-middle" />
                  </span>
                </div>
              </Reveal>

              <Reveal delay={320}>
                <p className="max-w-2xl text-base md:text-lg text-zinc-500 leading-relaxed mb-8 font-light font-sans">
                  Building <strong className="text-zinc-200 font-semibold">ORION HELIX AI</strong> — scalable
                  multimodal AI infrastructure and autonomous systems. Focused on highly concurrent backend
                  architecture and enterprise-grade performance engineering.
                </p>
              </Reveal>

              {/* ── NEW: CURRENTLY BUILDING WIDGET ── */}
              <Reveal delay={360}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 p-4 rounded-xl bg-white/[0.015] border border-white/[0.05] max-w-2xl hover:bg-white/[0.03] transition-colors cursor-default">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0a0a0a] border border-white/[0.05]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono">Current Focus</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">
                    Architecting the <span className="text-amber-400 font-semibold">Multiverse Room</span> state-sync logic via WebSockets.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={400}>
                <div className="flex flex-wrap items-center gap-4 mb-16">
                  <Magnetic>
                    <a href="#projects" className="flex items-center gap-2 bg-zinc-100 text-black px-7 py-3.5 rounded-xl font-semibold hover:bg-white transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.12)] text-sm font-sans">
                      View Infrastructure <ArrowRight size={15} />
                    </a>
                  </Magnetic>

                  {/* ── NEW: COMMAND PALETTE TRIGGER ── */}
                  <Magnetic>
                    <button onClick={() => setCmdOpen(true)} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-500/20 hover:text-white transition-colors text-sm font-sans cursor-none">
                      <Terminal size={16} />
                      Command Palette <span className="ml-1 text-[10px] font-mono border border-blue-400/30 px-1.5 py-0.5 rounded opacity-70">⌘K</span>
                    </button>
                  </Magnetic>
                  {/* ── NEW: DOWNLOAD CV BUTTON ── */}
                  <Magnetic>
                    <button onClick={() => setIsGeneratingCV(true)} className="px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 font-bold text-sm text-white flex items-center gap-2 hover:bg-white/10 transition-all cursor-none font-sans">
                      <FileText size={16} /> Download CV
                    </button>
                  </Magnetic>
                  {/* Social links */}
                  {[
                    { href: 'https://github.com/debajit-ai', Icon: GithubSVG, label: 'GitHub', hoverColor: 'group-hover:text-white' },
                    { href: 'https://linkedin.com/in/debajit-goswami-363a8b317', Icon: LinkedinSVG, label: 'LinkedIn', hoverColor: 'group-hover:text-[#0A66C2]' },
                  ].map(({ href, Icon, label, hoverColor }) => (
                    <Magnetic key={label}>
                      <a href={href} target="_blank" rel="noreferrer" aria-label={label}
                        className={`group flex items-center justify-center bg-white/[0.02] border border-white/[0.07] text-zinc-500 ${hoverColor} w-[50px] h-[50px] rounded-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300`}>
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  ))}
                </div>
              </Reveal>

              {/* Metrics (LIVE GITHUB DATA) */}
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Public Repositories', value: githubStats.repos },
                    { label: 'Architecture Designs', value: '12+' },
                    { label: 'GitHub Followers', value: githubStats.followers },
                    { label: 'Contributions', value: '1.2k' },
                  ].map((m, i) => (
                    <Reveal key={i} delay={100 + i * 80}>
                      <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500 group h-full">
                        <h4 className="text-3xl font-black text-zinc-100 tracking-tighter mb-1 font-sans group-hover:text-blue-400 transition-colors">{m.value}</h4>
                        <p className="text-[10px] text-zinc-600 font-semibold uppercase tracking-[0.16em] font-sans">{m.label}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* ── NEW: GITHUB HEATMAP ── */}
                <Reveal delay={420}>
                  <GithubHeatmap />
                </Reveal>
              </div>

            </section>

            {/* ── Focus Areas ── */}
            <section id="focus" className="mb-32">
              <Reveal><SectionHeading icon={Workflow} title="Core Engineering Focus" /></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FOCUS_AREAS.map((area, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="p-6 rounded-2xl bg-[#050505] border border-white/[0.05] hover:border-white/[0.12] hover:bg-[#0a0a0a] transition-all duration-500 group relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none"
                        style={{ background: `radial-gradient(circle at 30% 30%, ${area.color}08, transparent 70%)` }} />
                      {area.icon && <area.icon size={20} strokeWidth={1.5} className="mb-4 transition-colors duration-300"
                        style={{ color: 'rgba(161,161,170,1)' }}
                        onMouseEnter={e => e.currentTarget.style.color = area.color}
                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(161,161,170,1)'} />}
                      <h4 className="text-zinc-200 font-semibold text-sm mb-2 font-sans">{area.title}</h4>
                      <p className="text-zinc-500 text-xs leading-relaxed font-sans">{area.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Architecture ── */}
            <section id="architecture" className="mb-32">
              <Reveal>
                <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <Network className="text-blue-500" size={20} />
                    <h3 className="text-xl font-semibold text-zinc-100 tracking-tight font-sans">Infrastructure Topology</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono">Reference Architecture</span>
                  </div>
                </div>
              </Reveal>
              <div className="p-8 md:p-14 rounded-3xl bg-[#020202] border border-white/[0.05] relative overflow-hidden group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-blue-500/[0.025] blur-[90px] rounded-full pointer-events-none" />
                <div className="flex flex-col md:flex-row items-center justify-between relative z-10 max-w-4xl mx-auto">
                  <ArchNode icon={Globe} title="Client / Edge" desc="CDN & UI Delivery" delay={100} />
                  <Connector delay={180} />
                  <ArchNode icon={Lock} title="API Gateway" desc="Auth · Rate Limit · gRPC" delay={260} />
                  <Connector delay={340} />
                  <ArchNode icon={Cpu} title="Orchestration" desc="Model Routing & Queues" delay={420} />
                  <Connector delay={500} />
                  <ArchNode icon={Database} title="Memory State" desc="Vector DB & Semantic Cache" delay={580} />
                </div>
              </div>
            </section>

            {/* ── Skills (SVG Logo Grid) ── */}
            <section id="skills" className="mb-32">
              <Reveal><SectionHeading icon={Code2} title="Technical Skills" /></Reveal>
              <div className="space-y-12">
                {SKILL_GROUPS.map((group, gi) => (
                  <div key={gi}>
                    <Reveal delay={gi * 60}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                        <span className="text-[10px] uppercase tracking-[0.22em] font-semibold font-mono"
                          style={{ color: group.color }}>{group.category}</span>
                        <div className="flex-1 h-px bg-white/[0.04]" />
                      </div>
                    </Reveal>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                      {group.skills.map((skill, si) => (
                        <SkillCard key={skill.name} skill={skill} color={group.color} delay={gi * 40 + si * 50} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Capabilities Matrix ── */}
            <section id="systems" className="mb-32">
              <CapabilitiesMatrix />
            </section>

            {/* ── Experience ── */}
            <section id="experience" className="mb-32">
              <Reveal><SectionHeading icon={GitBranch} title="Experience" /></Reveal>
              <div className="relative pl-6 border-l border-white/[0.06] space-y-10">
                {EXPERIENCE.map((e, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="relative group">
                      <div className="absolute -left-[29px] top-1 w-3.5 h-3.5 rounded-full border-2 border-blue-500/60 bg-black group-hover:border-blue-400 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-400" />
                      <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">{e.year}</span>
                      <h4 className="text-zinc-100 font-semibold text-base mt-1 font-sans">{e.role}</h4>
                      <span className="text-xs text-blue-400 font-mono tracking-wide">{e.org}</span>
                      <p className="text-zinc-500 text-sm leading-relaxed mt-2 max-w-xl font-sans">{e.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Projects ── */}
            <section id="projects" className="mb-32">
              <Reveal><SectionHeading icon={Terminal} title="Deployed Systems" /></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PROJECTS.map((p, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="group p-6 rounded-2xl bg-[#050505] border border-white/[0.05] hover:bg-[#0a0a0a] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                        style={{ background: `radial-gradient(circle at 0% 0%, ${p.accent}06, transparent 60%)` }} />
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                          <span className="text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 rounded border mb-2 inline-block font-mono"
                            style={{ color: p.accent, borderColor: `${p.accent}40`, background: `${p.accent}10` }}>{p.badge}</span>
                          <h4 className="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition-colors tracking-tight block font-sans">{p.title}</h4>
                        </div>
                        <a href={p.link} target="_blank" rel="noreferrer" className="text-zinc-600 hover:text-zinc-300 transition-colors">
                          <ExternalLink size={15} />
                        </a>
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-grow relative z-10 font-sans">{p.description}</p>
                      {p.teamNote && (
                        <p className="text-[11px] text-zinc-600 italic font-sans mb-6 relative z-10 border-l-2 border-zinc-800 pl-3">{p.teamNote}</p>
                      )}
                      <button onClick={() => setSelectedProject(p)} className="w-full py-4 mt-4 mb-4 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-sans relative z-10">
                        View Architecture Case Study <ChevronRight size={14} />
                      </button>
                      <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/[0.03] relative z-10">
                        <div className="flex gap-2.5 flex-wrap">
                          {p.tech.map(t => (
                            <span key={t} className="text-[9px] uppercase tracking-[0.15em] font-semibold font-sans text-zinc-600 group-hover:text-zinc-400 transition-colors">{t}</span>
                          ))}
                        </div>
                        <a href={p.link} target="_blank" rel="noreferrer"
                          className="text-[11px] font-semibold text-zinc-500 flex items-center gap-1 hover:text-zinc-200 transition-colors group/link font-sans">
                          Repo <ChevronRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
            {/* ── NEW: Endorsements ── */}
            <Endorsements />
            {/* ── NEW: Thinking / Blog ── */}
            <ThinkingSection />
            {/* ── Contact ── */}
            <section id="contact" className="mb-16">
              <Reveal>
                <div className="relative p-10 md:p-16 rounded-3xl bg-[#020202] border border-white/[0.06] overflow-hidden text-center">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] bg-blue-500/[0.04] blur-[100px] rounded-full pointer-events-none" />
                  <div className="relative z-10">
                    <h3 className="text-3xl md:text-5xl font-black text-zinc-100 tracking-tighter mb-8 font-sans">
                      Let's build something <span className="text-blue-400">extraordinary.</span>
                    </h3>
                    <div className="flex flex-col items-center gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Official Email</span>
                        <a href="mailto:debajit.singularity@proton.me" className="text-lg font-bold text-zinc-200 hover:text-blue-400 transition-colors font-mono">
                          debajit.singularity@proton.me
                        </a>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Direct Line</span>
                        <a href="tel:+919612617013" className="text-xl md:text-2xl font-bold text-zinc-200 hover:text-cyan-400 transition-colors font-mono">
                          +91 96126 17013
                        </a>
                      </div>
                      {/* Social icons row — SVG logos, no text */}
                      <div className="flex gap-4 mt-6">
                        {[
                          { href: 'https://linkedin.com/in/debajit-goswami-363a8b317', Icon: LinkedinSVG, label: 'LinkedIn', hoverColor: 'hover:text-[#0A66C2]' },
                          { href: 'https://github.com/debajit-ai', Icon: GithubSVG, label: 'GitHub', hoverColor: 'hover:text-white' },
                        ].map(({ href, Icon, label, hoverColor }) => (
                          <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                            className={`flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.07] text-zinc-500 ${hoverColor} hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300`}>
                            <Icon size={20} />
                          </a>
                        ))}
                      </div>
                      <CopyEmail />
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>

          </main>

          {/* ── Footer ── */}
          <footer className="border-t border-white/[0.03] py-14 text-center bg-[#020202] relative z-10">
            <Reveal>
              {/* Lighthouse Scores */}
              <div className="flex justify-center gap-4 md:gap-8 mb-10">
                {[
                  { label: 'Performance', score: 100 },
                  { label: 'Accessibility', score: 100 },
                  { label: 'Best Practices', score: 100 },
                  { label: 'SEO', score: 100 }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 group cursor-default">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-green-500/30 flex items-center justify-center bg-green-500/5 group-hover:border-green-400 group-hover:bg-green-500/10 transition-all duration-500 shadow-[0_0_15px_rgba(34,197,94,0.1)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.25)]">
                      <span className="text-green-400 font-mono text-sm md:text-base font-bold tracking-tighter">{stat.score}</span>
                    </div>
                    <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">{stat.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-zinc-600 font-light tracking-wide mb-3 font-sans">
                Building future AI systems under{' '}
                <strong className="text-zinc-400 font-semibold">SINGULARITY HORIZON TECHNOLOGIES PVT. LTD.</strong>
              </p>
              <p className="text-[10px] opacity-30 font-mono tracking-widest uppercase">
                SYSTEM LOG • {new Date().getFullYear()} • NOMINAL
              </p>
            </Reveal>
          </footer>
        </div>
      </div>
    </ReactLenis>
  );
}