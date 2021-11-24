import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

const Header = (props) => {
  return (
    <Menu fixed='top' inverted>
      <Dropdown item icon="chain" simple>
        <Dropdown.Menu>
          <Dropdown.Item>New</Dropdown.Item>
          <Dropdown.Item>Elections</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        <Menu.Item position='right'>Votin{<p style={{ color: '#3a86ff', display: 'inline' }}>Chain</p>}</Menu.Item>
    </Menu>
  )
}

export default Header
