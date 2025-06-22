import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center justify-center content-center h-16 cursor-pointer"
      onClick={() => navigate('/')}
    >
      <img src="../../../images/ideos.svg" alt="Logo" className="h-10 w-auto" />
      <img
        src="../../../images/ideos.png"
        alt="Logo Text"
        className="h-9 w-auto pt-1"
      />
    </div>
  );
}
