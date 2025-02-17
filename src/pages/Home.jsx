import React from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 mt-8">
      <h1 className="text-3xl font-bold mb-4">About Me</h1>
      <p className="text-gray-300 mb-6">
        I’m Chirag Dewan, a Cyber Research Scientist with a passion for vulnerability research,
        reverse engineering, and cybersecurity. I thrive on uncovering hidden threats and building
        robust defenses.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">GitHub Contributions</h2>
        <GitHubCalendar
          username="chirag-dewan"
          blockSize={16}
          blockMargin={4}
          colorScheme="dark"
          theme={{
            background: "transparent",
            text: "#ffffff",
          }}
        />
      </section>
    </div>
  );
}
