export const topicDetailcontent = theme => ({
  header: {
    fontSize: 20,
    color: theme.palette.secondary[100],
    textAlign: 'center',
  },
  content: {
    padding: '0 10px',
    borderRadius: 5,
    '& img': {
      maxWidth: '100%',
    },
  },
  paper: {
    margin: 24,
  },
  answer: {
    height: '20px',
    padding: 5,
    lineHeight: '20px',
    backgroundColor: theme.palette.secondary[500],
  },
  number: {
    paddingLeft: '10px',
  },
  notLoginButton: {
    textAlign: 'center',
    padding: '20px 0',
  },
  replyEditor: {
    position: 'relative',
    padding: 24,
    borderBottom: '1px solid #dfdfdf',
    '& .CodeMirror': {
      height: 150,
      minHeight: 'auto',
      '& .CodeMirror-scroll': {
        minHeight: 'auto',
      },
    },
  },
  replyButton: {
    position: 'absolute',
    right: 40,
    bottom: 65,
    zIndex: 101,
    opacity: 0.1,
    transition: 'opacity .3s',
    '&:hover': {
      opacity: 1,
    },
  },
})
export const ReplyStyle = theme => ({
  root: {
    padding: '5px 10px',
    minHeight: '150px',
    borderBottom: '1px solid #ccc',

  },

  left: {
    float: 'left',
  },
  username: {
    padding: '4px 5px',
    '& name': {
      fontSize: '14px',
      color: theme.palette.secondary[400],
    },
  },
  right: {
    display: 'inline-block',
  },
})
