import avatar from './login.jpg'

export default () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  menu: {
    width: 200,
  },
  box: {
    backgroundImage: 'url('+avatar+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    width: '100%',
    height: '900px',
    overflow: 'hidden',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  boxlogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '400px',
    height: '500px',
  },
});
