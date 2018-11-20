export const topicPrimaryStyle = theme => ({
  root: {
    display: 'flex',
    aliginItem: 'center',
  },
  title: {
    color: '#555',
  },
  tab: {
    backgroundColor: theme.palette.primary[500],
    textALign: 'center',
    display: 'inline-block',
    padding: '0 10px',
    color: '#fff',
    borderRadius: '5px',
    marginRight: 10,
    fontSize: '12px',
  },
})
export const topicSecondartStyles =theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    fontSize: 14,
  },
  count: {
    textAlign: 'center',
  },
  username: {
    marginRight: 20,
    color: '#9e9e9e',
  },
  reply_count: {
    color: theme.palette.secondary[300],
  },
  creat_at: {
    marginLeft: 10,
  },
})
