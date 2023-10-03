import './searchBar.css'
import PropTypes from 'prop-types'
import { Box, Input } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ placeholder, onChange, searchBarWidth, ...params }) => {
  return (
    <>
      <Box className="search-bar">
        <Input
          endAdornment={<SearchIcon sx={{ marginRight: '10px' }} />}
          placeholder={placeholder}
          onChange={onChange}
          sx={{
            width: searchBarWidth,
            height: '40px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1rem'
          }}
          {...params}
        />
      </Box>
    </>
  )
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  searchBarWidth: PropTypes.string,
}

SearchBar.defaultProps = {
  onChange: () => {},
  searchBarWidth: '80%',
}

export default SearchBar
