import { useState } from "react";

const TURTLES = {
  leonardo: {
    name: "Leonardo", label: "Leo", subtitle: "Mutant. Ninja. Parent Advisor.",
    color: "#1a6fbd", bg: "#0d3d6b", accent: "#4da6ff", icon: "🐢",
    loading: "Meditating on your question...",
    system: `You are Leonardo from Teenage Mutant Ninja Turtles — the disciplined, honorable leader. You give parenting advice in Leo's voice: calm, thoughtful, noble, occasionally quoting bushido or Sun Tzu, using battle/warrior metaphors for raising children. You believe in structure, leading by example, and the long game. You take parenting seriously as a sacred duty. Keep responses 3-5 sentences. End with a short, Leo-style motivational line.`,
  },
  raphael: {
    name: "Raphael", label: "Raph", subtitle: "Mutant. Ninja. Parent Advisor.",
    color: "#c0392b", bg: "#6b0d0d", accent: "#ff6b6b", icon: "🐢",
    loading: "Give me a sec, I'm workin' on it...",
    system: `You are Raphael from Teenage Mutant Ninja Turtles — the hot-headed, sarcastic, tough-love turtle. You give parenting advice in Raph's voice: blunt, no-nonsense, a little gruff, occasionally sarcastic, but genuinely caring underneath the attitude. You don't sugarcoat things. You say stuff like "yer kid", "c'mon", "ya gotta". You believe tough love is still love. Keep responses 3-5 sentences. End with something gruff but secretly heartfelt.`,
  },
  michelangelo: {
    name: "Michelangelo", label: "Mikey", subtitle: "Mutant. Ninja. Parent Advisor.",
    color: "#e67e22", bg: "#6b3a0d", accent: "#ffaa4d", icon: "🐢",
    loading: "Dude, hold on, I'm thinking...",
    system: `You are Michelangelo from Teenage Mutant Ninja Turtles — the fun-loving, pizza-obsessed, eternally enthusiastic party dude. You give parenting advice in Mikey's voice: upbeat, silly, full of "dude", "bro", "radical", "cowabunga", pizza references where possible, and a surprising amount of genuine warmth. You think parenting is basically just making sure everyone has fun and eats enough pizza. Keep responses 3-5 sentences. End with something enthusiastic and Mikey-ish.`,
  },
  donatello: {
    name: "Donatello", label: "Donnie", subtitle: "Mutant. Ninja. Parent Advisor.",
    color: "#7d3c98", bg: "#3d0d6b", accent: "#c084fc", icon: "🐢",
    loading: "Processing... fascinating query...",
    system: `You are Donatello from Teenage Mutant Ninja Turtles — the tech genius, inventor, and overthinker of the group. You give parenting advice in Donnie's voice: slightly nerdy, data-curious, referencing brain development or sleep science when relevant, occasionally over-explaining things, but genuinely thoughtful and sweet. You might reference one of your inventions as a parenting metaphor. You say things like "technically speaking", "fascinating", "I've been researching". Keep responses 3-5 sentences. End with something endearingly nerdy.`,
  },
};

const BONUS = {
  splinter: {
    name: "Master Splinter", label: "Splinter", subtitle: "Sensei. Father. Sage.",
    color: "#8B6914", bg: "#3d2d08", accent: "#a2334f", icon: "🐭",
    loading: "Wisdom takes a moment to surface...",
    system: `You are Master Splinter from Teenage Mutant Ninja Turtles — the wise, patient, deeply loving rat sensei and father figure. You give parenting advice in Splinter's voice: ancient, measured, deeply warm, drawing on Eastern philosophy and the wisdom of a father who raised four sons in the darkness and watched them become heroes. You speak in gentle but profound ways. You refer to children as "little ones" or "young ones." You occasionally reference your own experience raising the turtles. Keep responses 3-5 sentences. End with a short piece of quiet wisdom.`,
  },
  april: {
    name: "April O'Neil", label: "April", subtitle: "Reporter. Friend. Voice of Reason.",
    color: "#b8860b", bg: "#3d2d00", accent: "#ffe066", icon: "📺",
    loading: "On it — April O'Neil never misses a deadline...",
    system: `You are April O'Neil from Teenage Mutant Ninja Turtles — the resourceful, grounded, warm-hearted journalist and trusted friend of the turtles. You give parenting advice in April's voice: practical, empathetic, no-nonsense but kind, like a smart friend who's done her research. You're the most "normal" person in the room and proud of it. You occasionally reference your journalist instincts — asking the right questions, looking for the real story beneath the surface. Keep responses 3-5 sentences. End with something encouraging and real.`,
  },
  shredder: {
    name: "The Shredder", label: "Shredder", subtitle: "Villain. Overlord. Surprisingly Opinionated.",
    color: "#5a5a8a", bg: "#1a1a2e", accent: "#9ca2c4", icon: "⚔️",
    loading: "The Shredder does not wait. But he will make an exception...",
    system: `You are The Shredder from Teenage Mutant Ninja Turtles — the dramatic, imperious, steel-clad villain and leader of the Foot Clan. You give parenting advice in Shredder's voice: theatrical, intense, overly dramatic, treating every parenting challenge as if it were a battle for world domination. You speak in grand declarations. You occasionally reference the Foot Clan, discipline, and the importance of absolute loyalty. Despite yourself, your advice is sometimes accidentally correct. You say things like "FOOLISH child", "You DARE", "This will not be tolerated." Keep responses 3-5 sentences. End with something menacing that is also somehow good parenting advice.`,
  },
  bebop_rocksteady: {
    name: "Bebop & Rocksteady", label: "Bebop & Rocksteady", subtitle: "Mutant. Chaotic. Enthusiastic.",
    color: "#4a7a2a", bg: "#1a2e0a", accent: "#6fc402", icon: "🦏",
    loading: "Uh... we're thinkin' real hard about this one...",
    system: `You are Bebop AND Rocksteady from Teenage Mutant Ninja Turtles — the lovably dim, enthusiastic, bickering mutant henchmen. You give parenting advice as BOTH of them in a short dialogue, interrupting and responding to each other. Format it as alternating lines labeled "Bebop:" and "Rocksteady:" — sometimes agreeing, sometimes disagreeing, often missing the point, but occasionally stumbling into something surprisingly sweet. Bebop is the warthog, slightly more street-smart. Rocksteady is the rhino, slightly more eager. They both try hard. Keep it to 5-7 lines of back-and-forth total. End with them accidentally agreeing on something wholesome.`,
  },
};

const ALL = { ...TURTLES, ...BONUS };

export default function TMNTParenting() {
  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [bonusOpen, setBonusOpen] = useState(false);

  async function handleSubmit(charKey) {
    if (!question.trim()) return;
    setSelected(charKey);
    setActiveKey(charKey);
    setLoading(true);
    setResponse(null);
    const char = ALL[charKey];
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: char.system,
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

  const active = activeKey ? ALL[activeKey] : null;

  function CharButton({ charKey, c }) {
    const isSelected = selected === charKey;
    const isHovered = hovered === charKey;
    const isActive = isSelected && loading;
    const showFilled = isSelected || isHovered;
    return (
      <button
        onClick={() => handleSubmit(charKey)}
        disabled={loading}
        onMouseEnter={() => setHovered(charKey)}
        onMouseLeave={() => setHovered(null)}
        style={{
          flex: "1",
          minWidth: "100px",
          padding: "14px 10px",
          background: showFilled ? c.color : "rgba(255,255,255,0.04)",
          border: `2px solid ${showFilled ? c.accent : "rgba(255,255,255,0.1)"}`,
          borderRadius: "12px",
          color: showFilled ? "#fff" : c.accent,
          fontSize: "14px",
          fontWeight: "800",
          letterSpacing: "1px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
          textTransform: "uppercase",
          opacity: loading && !isSelected ? 0.35 : 1,
          transform: isActive ? "scale(0.96)" : "scale(1)",
        }}
      >
        {c.label}
      </button>
    );
  }

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

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

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

        {/* Primary turtle buttons */}
        <div style={{ marginTop: "20px" }}>
          <div style={{ color: "#666", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>
            Choose your turtle
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {Object.entries(TURTLES).map(([key, c]) => (
              <CharButton key={key} charKey={key} c={c} />
            ))}
          </div>
        </div>

        {/* Bonus advisors toggle */}
        <div style={{ marginTop: "32px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={() => setBonusOpen(!bonusOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#555",
              fontSize: "11px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              padding: "0",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#888"}
            onMouseLeave={e => e.currentTarget.style.color = "#555"}
          >
            <span style={{
              display: "inline-block",
              transition: "transform 0.25s",
              transform: bonusOpen ? "rotate(90deg)" : "rotate(0deg)",
              fontSize: "10px",
            }}>▶</span>
            Choose another advisor
          </button>

          {bonusOpen && (
            <div style={{ marginTop: "12px", animation: "slideDown 0.2s ease" }}>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                {Object.entries(BONUS).map(([key, c]) => (
                  <CharButton key={key} charKey={key} c={c} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Response area */}
      {(loading || response) && active && (
        <div style={{
          width: "100%",
          maxWidth: "620px",
          background: `linear-gradient(135deg, ${active.bg}ee, rgba(0,0,0,0.85))`,
          border: `2px solid ${active.accent}44`,
          borderRadius: "20px",
          padding: "28px",
          boxShadow: `0 0 60px ${active.color}22`,
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px",
            paddingBottom: "14px",
            borderBottom: `1px solid ${active.accent}33`,
          }}>
            <div style={{
              width: "40px", height: "40px",
              background: active.color,
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px",
              boxShadow: `0 0 16px ${active.color}88`,
            }}>{active.icon}</div>
            <div>
              <div style={{ color: active.accent, fontWeight: "800", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase" }}>
                {active.name}
              </div>
              <div style={{ color: "#555", fontSize: "11px", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                {active.subtitle}
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ color: active.accent, fontSize: "15px", animation: "pulse 1.2s ease infinite", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              {active.loading}
            </div>
          ) : (
            <p style={{
              color: "#ddd",
              fontSize: "17px",
              lineHeight: "1.8",
              margin: 0,
              fontFamily: "Georgia, serif",
              whiteSpace: "pre-wrap",
            }}>
              {response}
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: "40px", color: "#333", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>
        Heroes in a half-shell 🍕 turtle power
      </div>
    </div>
  );
}
