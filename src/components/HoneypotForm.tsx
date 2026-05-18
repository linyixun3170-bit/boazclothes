/**
 * 🍯 蜜罐防垃圾表单组件
 *
 * 原理：在表单中添加一个肉眼不可见的隐藏字段。
 * 真人看不到不会填 → 空值 = 正常提交
 * 机器人自动填所有字段 → 有值 = 标记为垃圾
 *
 * 零用户体验摩擦，零 CAPTCHA 加载延迟。
 */
"use client";

import { useRef } from "react";

interface HoneypotFormProps {
  /** 包裹的子表单组件 */
  children: React.ReactNode;
  /** 表单提交处理器（收到 honeypot 值） */
  onSubmit: (e: React.FormEvent, honeypotValue: string) => void;
  /** 蜜罐字段名（默认 honeypot, 可改以防简单bot） */
  fieldName?: string;
}

export default function HoneypotForm({
  children,
  onSubmit,
  fieldName = "website_url",
}: HoneypotFormProps) {
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    const val = honeypotRef.current?.value || "";
    onSubmit(e, val);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 蜜罐字段：视觉隐藏 + 屏幕阅读器隐藏 */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor={fieldName}>Leave this empty</label>
        <input
          ref={honeypotRef}
          type="text"
          id={fieldName}
          name={fieldName}
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      {children}
    </form>
  );
}
