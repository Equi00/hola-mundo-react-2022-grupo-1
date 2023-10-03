import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import { PropTypes } from 'prop-types'

const DifficultyRating = ({ difficulty }) => {
  return <span>{difficultyCircles(difficulty)}</span>
}

function difficultyCircles(difficulty){
  if (!difficulty) return <p>Not rated</p>
  const { circleIconSize, pt } = { circleIconSize: 22, pt: 5 }
  const circles = {
    low: <div style={{ paddingTop: pt }}>
      <CircleIcon sx={{ fontSize: circleIconSize }} />
      <CircleOutlinedIcon sx={{ fontSize: circleIconSize }} />
      <CircleOutlinedIcon sx={{ fontSize: circleIconSize }} />
    </div>,
    medium: <div style={{ paddingTop: pt }}>
      <CircleIcon sx={{ fontSize: circleIconSize }} />
      <CircleIcon sx={{ fontSize: circleIconSize }} />
      <CircleOutlinedIcon sx={{ fontSize: circleIconSize }} />
    </div>,
    high: <div style={{ paddingTop: pt }}>
      <CircleIcon sx={{ fontSize: circleIconSize }} />
      <CircleIcon sx={{ fontSize: circleIconSize }} />
      <CircleIcon sx={{ fontSize: circleIconSize }} />
    </div>
  }
  return circles[difficulty.name]
}

DifficultyRating.propTypes = {
  difficulty: PropTypes.shape({
    name: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
  }).isRequired,
}

export default DifficultyRating