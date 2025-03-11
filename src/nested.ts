import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";

export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter(q => q.published);
}

export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(q => q.body !== "" || q.expected !== "" || q.options.length > 0);
}

export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    return questions.find(q => q.id === id) || null;
}

export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter(q => q.id !== id);
}

export function getNames(questions: Question[]): string[] {
    return questions.map(q => q.name);
}

export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map(q => ({
        questionId: q.id,
        text: "",
        submitted: false,
        correct: false
    }));
}

export function publishAll(questions: Question[]): Question[] {
    return questions.map(q => ({ ...q, published: true }));
}

export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    return [...questions, { id, name, body: "", type, options: [], expected: "", published: false, points: 0 }];
}

export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map(q => q.id === targetId ? { ...q, name: newName } : q);
}

export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    return questions.map(q => {
        if (q.id === targetId) {
            const newOptions = [...q.options];
            if (targetOptionIndex === -1) {
                newOptions.push(newOption);
            } else if (targetOptionIndex >= 0 && targetOptionIndex < newOptions.length) {
                newOptions[targetOptionIndex] = newOption;
            }
            return { ...q, options: newOptions };
        }
        return q;
    });
}
