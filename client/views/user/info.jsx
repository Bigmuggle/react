import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import
List,
{
  ListItem,
  ListItemText,
} from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Avatar from 'material-ui/Avatar'
import UserWrapper from './user'
import infoStyle from './styles/info-style'

const ListItems = () => (
  <div>
    <List component="nav">
      <ListItem button>
        <Avatar src="https://gss0.bdstatic.com/70cFfyinKgQIm2_p8IuM_a/daf/pic/item/bf096b63f6246b60651b55d0e6f81a4c510fa279.jpg" />
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>

    </List>
  </div>
)
class LoginInfo extends React.Component {
  render() {
    const {
      classes,
    } = this.props
    return (
      <UserWrapper className={classes.Paper}>
        <Grid container spacing={16} align="stretch">
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>最近发布的话题</span>
              </Typography>
              <ListItems />
            </Paper>
          </Grid>
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>新的回复</span>
              </Typography>
            123
            </Paper>
          </Grid>
          <Grid xs={12} md={4} item>
            <Paper elevation={2} className={classes.paper}>
              <Typography variant="title" gutterBottom className={classes.prgrstyle}>
                <span>收藏的话题</span>
              </Typography>
            12
            </Paper>
          </Grid>
        </Grid>
      </UserWrapper>
    )
  }
}
LoginInfo.propTypes = {
  classes: PropTypes.object.isRequired,
}
export default withStyles(infoStyle)(LoginInfo)
