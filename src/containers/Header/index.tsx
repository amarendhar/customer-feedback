import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@mui/material'
import { Menu } from '@mui/icons-material'

const drawerWidth = 240
const navItems = [
  { label: 'Write Review', to: '/' },
  { label: 'All Reviews', to: '/reviews' },
]

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState)
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Customer Feedback
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map(({ label, to }) => (
              <NavLink key={label} to={to}>
                <Button sx={{ color: '#fff' }}>{label}</Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Customer Feedback
            </Typography>
            <Divider />
            <List>
              {navItems.map(({ label, to }) => (
                <NavLink key={label} to={to}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </Box>
  )
}

export default Header
