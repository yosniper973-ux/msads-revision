import type { Question } from '../../types';
import QcmSingle from './QcmSingle';
import QcmMulti from './QcmMulti';
import TrueFalse from './TrueFalse';
import OpenText from './OpenText';
import DragDrop from './DragDrop';
import FillBlank from './FillBlank';

interface Props {
  question: Question;
  onAnswer: (selected: (number | string)[], correct: boolean) => void;
  disabled: boolean;
}

export default function QuestionRenderer({ question, onAnswer, disabled }: Props) {
  switch (question.type) {
    case 'qcm_single':
      return <QcmSingle question={question} onAnswer={onAnswer} disabled={disabled} />;
    case 'qcm_multi':
      return <QcmMulti question={question} onAnswer={onAnswer} disabled={disabled} />;
    case 'true_false':
      return <TrueFalse question={question} onAnswer={onAnswer} disabled={disabled} />;
    case 'open_text':
      return <OpenText question={question} onAnswer={onAnswer} disabled={disabled} />;
    case 'drag_drop':
      return <DragDrop question={question} onAnswer={onAnswer} disabled={disabled} />;
    case 'fill_blank':
      return <FillBlank question={question} onAnswer={onAnswer} disabled={disabled} />;
    default:
      return <div>Type de question non supporté</div>;
  }
}
