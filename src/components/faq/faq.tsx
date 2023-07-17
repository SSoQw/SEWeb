import React, {useEffect, useState} from "react";

interface Question {
    id: number;
    category: string;
    question: string;
    answer: string;
}

const fetchQuestionData = async () => {
    const response = await fetch("/questions.json");
    const data = await response.json();
    return data.questions as Question[];
};

const QuestionsPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [expandedCard, setExpandedCard] = useState<number | null>(null);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchQuestionData();
            console.log("Fetched data:", data);
            setQuestions(data);
        };
        fetchData().then(() => "None Data :(");
    }, []);


    const toggleExpand = (index: number) => {
        if (expandedCard === index) {
            // Clicked card is already expanded, collapse it
            setExpandedCard(null);
        } else {
            // Clicked card is not expanded, expand it
            setExpandedCard(index);
        }
    };

    const renderAnswerWithParagraphs = (answer: string) => {
        const lines = answer.split("\n\n");
        return lines.map((line, index) => <p key={index}>{line}</p>);
    };

    const questionsByCategory = questions.reduce(
        (acc: { [key: string]: Question[] }, question) => {
            if (!acc[question.category]) {
                acc[question.category] = [];
            }
            acc[question.category].push(question);
            return acc;
        },
        {}
    );

    const filterQuestions = (questions: Question[], searchText: string) => {
        if (searchText.trim().length === 0) {
            return questions;
        }
        return questions.filter((question) =>
            question.question.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div>
            <h1>FAQ</h1>
            <form autoComplete="false">
                <div className="form-row">
                    <div>
                        <input
                            type="text"
                            placeholder="Search Questions..."
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </form>
            {Object.entries(questionsByCategory).map(([category, questions]) => {
                const filteredQuestions = filterQuestions(questions, searchText);
                    if (filteredQuestions.length === 0) {
                        return null; // Skip rendering category if no matching questions
                    }
                return (
                    <div key={category}>
                        <h2>{category}</h2>
                        {filteredQuestions.map((question: Question) => (
                            <div
                                key={`${category}-${question.id}`}
                                className={`question-card ${
                                    expandedCard === question.id ? "expanded" : ""
                                }`}
                                onClick={() => toggleExpand(question.id)}
                            >
                                    <div className="question-header">
                                        <span>{question.question}</span>
                                        <span
                                            className={`expand-icon ${
                                                expandedCard === question.id ? "minus" : "plus"
                                            }`}
                                        >
                    {expandedCard === question.id ? "-" : "+"}
                  </span>
                                    </div>
                                    {expandedCard === question.id && (
                                        <div className="question-content">
                                            {renderAnswerWithParagraphs(question.answer)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })}
            <h2>Want To Learn More?</h2>
            <p>Our documentation provides comprehensive electrical resources, buying guides, troubleshooting docs,
                and quick start guides for your convenience. It's a valuable resource for further information.</p>
            <a href="https://docs.sellickelectric.com">
                <button className="faq-link">Visit Our Documentation</button>
            </a>
        </div>
    );
};

export default QuestionsPage;
