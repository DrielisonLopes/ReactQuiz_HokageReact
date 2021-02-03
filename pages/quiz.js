import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>
        Resultado do seu exame:
      </Widget.Header>

      <Widget.Content>
      {/* [Desafio da Tela de Resultado] */}
      {results.filter(x => x).length <= 5 &&
        <figure><img
        alt="bad-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://media.tenor.com/images/486d805076db64d15bb36f2ae93f262b/tenor.gif'
        /><figcaption>Mas um pouco e se tornará um Chunin developer!</figcaption>
        </figure>
      }
      {results.filter(x => x).length == 6 && 
        <figure><img
        alt="middle-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://pa1.narvii.com/6660/b1fbb30dc7d00bec9dc41d938e7a587f938c95f2_00.gif'
        /><figcaption>Não desista Jounin, você é quase um ANBU developer!</figcaption>
        </figure>
      }
      {results.filter(x => x).length == 7 && 
        <figure><img
        alt="middle-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://pa1.narvii.com/6660/b1fbb30dc7d00bec9dc41d938e7a587f938c95f2_00.gif'
        /><figcaption>Não desista Jounin, você é quase um ANBU developer!</figcaption>
        </figure>
      }
      {results.filter(x => x).length == 8 && 
        <figure><img
        alt="good-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://i.pinimg.com/originals/74/5c/3c/745c3ca489bc21318fdccf14b56d7a27.gif'
        /><figcaption>Nossa! Você é um lendário Sannin React?</figcaption>
        </figure>
      }
      {results.filter(x => x).length == 9 && 
        <figure><img
        alt="good-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://i.pinimg.com/originals/74/5c/3c/745c3ca489bc21318fdccf14b56d7a27.gif'
        /><figcaption>Nossa! Você é um lendário Sannin React?</figcaption>
        </figure>
      }
      {results.filter(x => x).length > 9 && 
        <figure><img
        alt="hokage-game"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src='https://thumbs.gfycat.com/BlaringSparseImperialeagle-small.gif'
        /><figcaption>Parabéns! Você é o novo Hokage React!</figcaption>
        </figure>
      }
      <p>
        Você acertou {results.filter(x => x).length} perguntas...
      </p>
      <p>
        No total de
        {' '}
        {results.reduce((actualSum, actualResult) => {
          const isCorrect = actualResult === true;
          if(isCorrect) {
            return actualSum + 50;
          }
          return actualSum;
        }, 0)}
        {' '}
        pontos.
      </p>
      {/* <ul>
        {results.map((result, i) => (
          <li key={i}>
            #0{i + 1} Resultado: {result === true ? 'Acertou' : 'Errou'}
          </li>
        ))}
      </ul> */}
    </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        [Desafio do Loading]
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAlternative(undefined);
            }, 3 * 1000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && <p>Muito bem...</p>}
          {isQuestionSubmited && !isCorrect && <p>Não pode ser...</p>}
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  // [React chama de: Efeitos || Effects]
  // React.useEffect
  // atualizado === willUpdate
  // morre === willUnmount
  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  // nasce === didMount
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}