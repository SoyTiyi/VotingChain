import React from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { useRouter } from 'next/dist/client/router'

const Header = (props) => {

  const router = useRouter()

  return (
    <Menu fixed='top' inverted>
      <Dropdown item icon="chain" simple>
        <Dropdown.Menu>
          <Dropdown.Item as="a" onClick={() => router.push('/new')}>New</Dropdown.Item>
          <Dropdown.Item>Elections</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        <Menu.Item position='right' onClick={() => router.push('/')}>Votin{<p style={{ color: '#3a86ff', display: 'inline' }}>Chain</p>}</Menu.Item>
    </Menu>
  )
}

export default Header
