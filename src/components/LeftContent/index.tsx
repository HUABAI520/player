import { Link } from '@@/exports';

export const LeftContent = () => {
  return (
    <>
      <img src="/system_logo.svg" alt="Logo" style={{ marginRight: '8px' }} />
      <Link to="/" style={{ color: 'black', fontWeight: '600', marginRight: '16px' }}>
        Computer Manager
      </Link>
    </>
  );
};
