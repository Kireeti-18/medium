interface Params {
  type: string;
  label: string;
  style: string;
  onClick: (value: object) => void;
}

export default function Button({ type, style, label, onClick }: Params) {
  const getButtonType = (type: string) => {
    let buttonType;
    switch (type) {
      case 'type1':
        buttonType = 'btn1';
        break;
      case 'type2':
        buttonType = 'btn2';
        break;
      default:
        buttonType = 'btn1';
    }
    return buttonType;
  };
  return (
    <button
      className={`${style} ${getButtonType(type)}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
