export const topicDetailcontent = theme => ({
  header: {
    fontSize: 20,
    color: theme.palette.secondary[100],
    textAlign: 'center',
  },
  content: {
    padding: '0 10px',
    borderRadius: 5,
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
