import React, { useEffect, useState } from 'react'
import { Box } from '@oneloop/box'
import { Icon } from '@oneloop/icons'
import { Text } from '@oneloop/text'
import { SliderSwap } from './SliderSwap'

export const FullScreen = ({
  fullscreen,
  tabContainers,
  tabSelected,
  fotos,
  index,
  setIndex,
  setTabSelected,
  videos,
  video360,
  setFullscreen,
  planos,
}) => {
  const allFiles = { fotos, videos, video360, planos }
  const [contTab, setContTab] = useState(0)
  const [swapInndex, setSwapInndex] = useState(index)
  const windowWidth = window.innerWidth
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [contTab, index])
  useEffect(() => {
    let newContTab
    if (tabSelected === 'videos') {
      newContTab = videos.length
    } else if (tabSelected === 'fotos') {
      newContTab = fotos.length
    } else if (tabSelected === 'planos') {
      newContTab = planos.length
    } else if (tabSelected === 'video360') {
      newContTab = video360.length
    }
    setContTab(newContTab)
  }, [tabSelected])

  const changeTabContainer = (tab) => {
    setIndex(0)
    setTabSelected(tab)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      if (index + 1 === contTab) return
      setIndex((prevIndex) => prevIndex + 1)
    }

    if (event.key === 'ArrowLeft') {
      if (index === 0) return
      setIndex((prevIndex) => prevIndex - 1)
    }

    if (event.key === 'Escape') {
      closeFullscreen()
    }
  }
  const closeFullscreen = () => {
    setIndex(swapInndex)
    setFullscreen(false)
  }
  console.log(swapInndex)
  return (
    <Box className={`fullscreen ${fullscreen ? 'openFullscreen' : ''}`}>
      <Box className="fsCloseIconMobile">
        <Icon
          onClick={closeFullscreen}
          className="closeIcon"
          icon="icon-cerrar"
        />
      </Box>
      <Box className="fsOverlay" onClick={closeFullscreen}></Box>
      {tabContainers.length > 1 && (
        <Box className="fsTabHeader">
          {tabContainers.map((tab, i) => (
            <Text
              key={i}
              onClick={() => changeTabContainer(tab.toLocaleLowerCase())}
              className={`${
                tabSelected === tab.toLocaleLowerCase() && 'tabSelected'
              }`}
              variant="bodyBold.fontSize14"
            >
              {tab}
            </Text>
          ))}
        </Box>
      )}
      <Box className="fsContainerTabs" __css={{ position: 'relative' }}>
        <Box className="fsTabCont">
          <Box className="fsTabContImage">
            <SliderSwap
              setIndex={setIndex}
              fullScreen={fullscreen}
              setSwapInndex={setSwapInndex}
              fileType={tabSelected}
              files={allFiles[tabSelected]}
              index={index}
              windowWidth={windowWidth}
            />
            <Text className="contFotos" variant="bodyBold.fontSize14">{`${
              index + 1
            }/${allFiles[tabSelected].length}`}</Text>
          </Box>
        </Box>
        <Box className="fsCloseIconDesktop">
          <Icon
            onClick={closeFullscreen}
            className="closeIcon"
            icon="icon-cerrar"
          />
        </Box>
      </Box>
    </Box>
  )
}
