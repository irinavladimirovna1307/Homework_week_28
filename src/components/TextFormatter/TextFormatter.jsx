import React, { useState } from "react";
import "./TextFormatter.css";

const TextFormatter = () => {
  const [inputValue, setInputValue] = useState("");
  const [formattedTexts, setFormattedTexts] = useState([]);
  const [formatType, setFormatType] = useState("uppercase");
  const [textColor, setTextColor] = useState("#007bff");
  const [bgColor, setBgColor] = useState("#f8f9fa");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newText = {
      id: Date.now(),
      original: inputValue,
      formatted: applyFormatting(inputValue),
      formatType,
      color: textColor,
      bgColor,
      timestamp: new Date().toLocaleString(),
    };

    setFormattedTexts([newText, ...formattedTexts]);
    setInputValue("");
  };

  const applyFormatting = (text) => {
    switch (formatType) {
      case "uppercase":
        return text.toUpperCase();
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return text
          .split("")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");
      case "reverse":
        return text.split("").reverse().join("");
      case "alternating":
        return text
          .split("")
          .map((char, i) =>
            i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
          )
          .join("");
      default:
        return text;
    }
  };

  const clearAll = () => {
    setFormattedTexts([]);
  };

  return (
    <div className="text-formatter-container">
      <div className="formatter-header">
        <h1>Text Formatter</h1>
        <p>Введите текст и выберите формат отображения</p>
      </div>

      <div className="formatter-controls">
        <div className="format-options">
          <div className="option-group">
            <label>Тип форматирования:</label>
            <select
              value={formatType}
              onChange={(e) => setFormatType(e.target.value)}
              className="format-select"
            >
              <option value="uppercase">ВЕРХНИЙ РЕГИСТР</option>
              <option value="lowercase">нижний регистр</option>
              <option value="capitalize">Заглавные Буквы</option>
              <option value="reverse">Реверс текста</option>
              <option value="alternating">ЧеРеДоВаНиЕ</option>
            </select>
          </div>

          <div className="color-options">
            <div className="option-group">
              <label>Цвет текста:</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
            </div>

            <div className="option-group">
              <label>Цвет фона:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Введите текст"
              className="text-input"
              autoFocus
            />
            <button type="submit">Форматировать</button>
          </div>
        </form>
      </div>

      {formattedTexts.length > 0 && (
        <div className="results-section">
          <div className="results-header">
            <h2>Форматированный текст</h2>
            <button onClick={clearAll} className="clear-btn">
              Очистить всё
            </button>
          </div>

          <div className="formatted-texts">
            {formattedTexts.map((item) => (
              <div
                key={item.id}
                className="text-item"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="text-header">
                  <span className="format-type">{item.formatType}</span>
                  <span className="timestamp">{item.timestamp}</span>
                </div>
                <p className="formatted-text" style={{ color: item.color }}>
                  {item.formatted}
                </p>
                <div className="original-text">
                  Оригинал: <span>{item.original}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {formattedTexts.length === 0 && (
        <div className="empty-state">
          <div className="placeholder-image">
            <svg viewBox="0 0 24 24">
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <p>Начните вводить текст для форматирования</p>
        </div>
      )}
    </div>
  );
};

export default TextFormatter;
