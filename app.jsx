import { useState } from "react";

const TURTLES = {
  leonardo: {
    name: "Leonardo",
    color: "#1a6fbd",
    bg: "#0d3d6b",
    accent: "#4da6ff",
    emoji: "🔵",
    label: "Leo",
    font: "bold",
    system: `You are Leonardo from Teenage Mutant Ninja Turtles — the disciplined, honorable leader. You give parenting advice in Leo's voice: calm, thoughtful, noble, occasionally quoting bushido or Sun Tzu, using battle/warrior metaphors for raising children. You believe in structure, leading by example, and the long game. You take parenting seriously as a sacred duty. Keep responses 3-5 sentences. End with a short, Leo-style motivational line.`,
  },
  raphael: {
    name: "Raphael",
    color: "#c0392b",
    bg: "#6b0d0d",
    accent: "#ff6b6b",
    emoji: "🔴",
    label: "Raph",
    font: "bold",
    system: `You are Raphael from Teenage Mutant Ninja Turtles — the hot-headed, sarcastic, tough-love turtle. You give parenting advice in Raph's voice: blunt, no-nonsense, a little gruff, occasionally sarcastic, but genuinely caring underneath the attitude. You don't sugarcoat things. You say stuff like "yer kid", "c'mon", "ya gotta". You believe tough love is still love. Keep responses 3-5 sentences. End with something gruff but secretly heartfelt.`,
  },
  michelangelo: {
    name: "Michelangelo",
    color: "#e67e22",
    bg: "#6b3a0d",
    accent: "#ffaa4d",
    emoji: "🟠",
    label: "Mikey",
    font: "bold",
    system: `You are Michelangelo from Teenage Mutant Ninja Turtles — the fun-loving, pizza-obsessed, eternally enthusiastic party dude. You give parenting advice in Mikey's voice: upbeat, silly, full of "dude", "bro", "radical", "cowabunga", pizza references where possible, and a surprising amount of genuine warmth. You think parenting is basically just making sure everyone has fun and eats enough pizza. Keep responses 3-5 sentences. End with something enthusiastic and Mikey-ish.`,
  },
  donatello: {
    name: "Donatello",
    color: "#7d3c98",
    bg: "#3d0d6b",
    accent: "#c084fc",
    emoji: "🟣",
    label: "Donnie",
    font: "bold",
    system: `You are Donatello from Teenage Mutant Ninja Turtles — the tech genius, inventor, and overthinker of the group. You give parenting advice in Donnie's voice: slightly nerdy, data-curious, referencing brain development or sleep science when relevant, occasionally over-explaining things, but genuinely thoughtful and sweet. You might reference one of your inventions as a parenting metaphor. You say things like "technically speaking", "fascinating", "I've been researching". Keep responses 3-5 sentences. End with something endearingly nerdy.`,
  },
};

export default function TMNTParenting() {
  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTurtle, setActiveTurtle] = useState(null);

  async function handleSubmit(turtleKey) {
    if (!question.trim()) return;
    setSelected(turtleKey);
    setActiveTurtle(turtleKey);
    setLoading(true);
    setResponse(null);

    const turtle = TURTLES[turtleKey];

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: turtle.system,
          messages: [{ role: "user", content: question }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find((b) => b.type === "text")?.text || "Uh... I got nothin'.";
      setResponse(text);
    } catch (e) {
      setResponse("Shell yeah, something broke. Try again, dude.");
    } finally {
      setLoading(false);
    }
  }

  const turtle = activeTurtle ? TURTLES[activeTurtle] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      backgroundImage: `
        radial-gradient(ellipse at 20% 50%, #1a2a1a 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, #1a1a2a 0%, transparent 50%),
        repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px),
        repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)
      `,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px",
      fontFamily: "'Trebuchet MS', Impact, sans-serif",
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ fontSize: "13px", letterSpacing: "6px", color: "#4a7c4a", textTransform: "uppercase", marginBottom: "10px" }}>
          🐢 Cowabunga, Parents 🐢
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 58px)",
          fontWeight: "900",
          color: "#e8e8e8",
          margin: "0 0 8px 0",
          letterSpacing: "-1px",
          textShadow: "0 0 40px rgba(100,200,100,0.2)",
          lineHeight: 1.1,
        }}>
          Turtle-Tested<br />
          <span style={{ color: "#4da640", WebkitTextStroke: "1px #2a6b20" }}>Parenting Advice</span>
        </h1>
        <p style={{ color: "#666", fontSize: "15px", margin: 0, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          From the sewers of New York to your living room.
        </p>
      </div>

      {/* Input card */}
      <div style={{
        width: "100%",
        maxWidth: "620px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        padding: "28px",
        backdropFilter: "blur(10px)",
        marginBottom: "24px",
      }}>
        <label style={{ display: "block", color: "#aaa", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
          Your parenting question
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="e.g. My toddler won't sleep. My kid is throwing tantrums at dinner. Help."
          rows={3}
          style={{
            width: "100%",
            background: "rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            color: "#e8e8e8",
            fontSize: "16px",
            padding: "14px 16px",
            resize: "vertical",
            outline: "none",
            fontFamily: "Georgia, serif",
            lineHeight: 1.6,
            boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(100,200,100,0.4)"}
          onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
        />

        {/* Turtle buttons */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ color: "#666", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
            Choose your turtle
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {Object.entries(TURTLES).map(([key, t]) => {
              const isActive = selected === key && loading;
              return (
                <button
                  key={key}
                  onClick={() => handleSubmit(key)}
                  disabled={loading}
                  style={{
                    flex: "1",
                    minWidth: "120px",
                    padding: "14px 10px",
                    background: selected === key
                      ? t.color
                      : `rgba(${key === 'leonardo' ? '26,111,189' : key === 'raphael' ? '192,57,43' : key === 'michelangelo' ? '230,126,34' : '125,60,152'},0.15)`,
                    border: `2px solid ${selected === key ? t.accent : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: "12px",
                    color: selected === key ? "#fff" : t.accent,
                    fontSize: "15px",
                    fontWeight: "800",
                    letterSpacing: "1px",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    textTransform: "uppercase",
                    opacity: loading && selected !== key ? 0.4 : 1,
                    transform: isActive ? "scale(0.97)" : "scale(1)",
                  }}
                  onMouseEnter={e => { if (!loading) { e.target.style.background = t.color; e.target.style.color = "#fff"; }}}
                  onMouseLeave={e => { if (selected !== key) { e.target.style.background = `rgba(${key === 'leonardo' ? '26,111,189' : key === 'raphael' ? '192,57,43' : key === 'michelangelo' ? '230,126,34' : '125,60,152'},0.15)`; e.target.style.color = t.accent; }}}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Response area */}
      {(loading || response) && turtle && (
        <div style={{
          width: "100%",
          maxWidth: "620px",
          background: `linear-gradient(135deg, ${turtle.bg}cc, rgba(0,0,0,0.8))`,
          border: `2px solid ${turtle.accent}44`,
          borderRadius: "20px",
          padding: "28px",
          position: "relative",
          boxShadow: `0 0 60px ${turtle.color}22`,
          animation: "fadeIn 0.3s ease",
        }}>
          <style>{`
            @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
          `}</style>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
            paddingBottom: "14px",
            borderBottom: `1px solid ${turtle.accent}33`,
          }}>
            <div style={{
              width: "36px", height: "36px",
              background: turtle.color,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
              boxShadow: `0 0 16px ${turtle.color}88`,
            }}>🐢</div>
            <div>
              <div style={{ color: turtle.accent, fontWeight: "800", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                {turtle.name}
              </div>
              <div style={{ color: "#555", fontSize: "11px", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Mutant. Ninja. Parent Advisor.
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ color: turtle.accent, fontSize: "15px", animation: "pulse 1.2s ease infinite", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              {turtle.name === "Michelangelo" ? "Dude, hold on, I'm thinking..." :
               turtle.name === "Raphael" ? "Give me a sec, I'm workin' on it..." :
               turtle.name === "Donatello" ? "Processing... fascinating query..." :
               "Meditating on your question..."}
            </div>
          ) : (
            <p style={{
              color: "#ddd",
              fontSize: "17px",
              lineHeight: "1.75",
              margin: 0,
              fontFamily: "Georgia, serif",
            }}>
              {response}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: "40px", color: "#333", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
        Heroes in a half-shell 🍕 turtle power
      </div>
    </div>
  );
}
