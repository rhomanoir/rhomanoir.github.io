const topicList = document.querySelector("#topic-list");
const topics = Array.isArray(window.courseTopics) ? window.courseTopics : [];

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

topics.forEach((topic) => {
  const section = element("section", "topic");
  section.append(element("h2", "", topic.title));

  topic.tasks.forEach((task, taskIndex) => {
    const paragraph = element("p", "problem");
    paragraph.append(
      element("strong", "problem-label", `${task.label}.`),
      document.createTextNode(` ${task.text}`),
    );
    section.append(paragraph);

    if (task.answer) {
      const answer = element("details", "answer");
      const answerToggle = element("summary", "answer-toggle");
      answerToggle.append(
        element("span", "toggle-copy toggle-copy-closed", "Показать ответ"),
        element("span", "toggle-copy toggle-copy-open", "Скрыть ответ"),
      );

      const answerBody = element("div", "answer-body");
      answerBody.append(
        element(
          "p",
          "answer-kicker",
          `ANSWER // ${String(taskIndex + 1).padStart(2, "0")}`,
        ),
        element("p", "answer-text", task.answer),
      );

      if (task.solution) {
        const solution = element("details", "solution");
        const solutionToggle = element("summary", "solution-toggle");
        solutionToggle.append(
          element("span", "toggle-copy toggle-copy-closed", "Показать решение"),
          element("span", "toggle-copy toggle-copy-open", "Скрыть решение"),
        );
        solution.append(
          solutionToggle,
          element("div", "solution-body", task.solution),
        );
        answerBody.append(solution);
      }

      answer.append(answerToggle, answerBody);
      answer.addEventListener("toggle", () => {
        if (answer.open && window.MathJax?.typesetPromise) {
          window.MathJax.typesetPromise([answerBody]);
        }
      });
      section.append(answer);
    }
  });

  topicList.append(section);
});
