import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { getAxios } from '../../api'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserRequestAction } from '../../reducers/user'

const axios = getAxios()

function Grass() {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const [value, onChange] = useState(new Date())
  const [mark, setMark] = useState([])
  const [curYear, setCurYear] = useState(parseInt(moment(new Date()).format('YYYY')))
  const [curMonth, setCurMonth] = useState(parseInt(moment(new Date()).format('M')))

  const onActiveStartDateChange = ({ action, activeStartDate, value, view }) => {
    // console.log('Changed view to: ', moment(activeStartDate).format('YYYY-M'), view)
    setCurYear(parseInt(moment(activeStartDate).format('YYYY')))
    setCurMonth(parseInt(moment(activeStartDate).format('M')))
  }

  const getJandi = async () => {
    try {
      let res = await axios.get('user/jandi', {
        params: {
          month: curMonth,
          userId: me.userId,
          year: curYear,
        },
      })
      // console.log('jandi: ', res.data)
      setMark([...res.data.jandis])
    } catch (err) {
      // console.log(err)
    }
  }

  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    dispatch(loadUserRequestAction({ userId: me.userId }))
    setLoading(true)
  }

  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        loadMoreData(me.userId)
        getJandi()
      }
    }
  }, [me])

  useEffect(() => {
    getJandi()
  }, [curYear, curMonth])

  return (
    <StyledCalender>
      <MyCalender
        onActiveStartDateChange={onActiveStartDateChange}
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format('DD')}
        value={value}
        className="mx-auto w-full text-sm"
        tileContent={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format('YYYY-M-D'))) {
            return (
              <>
                <div
                  className="flex justify-center items-center absoluteDiv"
                  style={{ position: 'relative', zIndex: '0' }}>
                  <StyledDot />
                </div>
              </>
            )
          }
        }}
        // tileClassName={({ date, view }) => {
        //   if (mark.find((x) => x === moment(date).format('YYYY-M-D'))) {
        //     return 'highlight'
        //   }
        // }}
      />
    </StyledCalender>
  )
}

const StyledCalender = styled.div`
  width: 100%;
  margin: 1rem auto;
  padding: 1rem 0;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
`

const MyCalender = styled(Calendar)`
  margin: 0 auto;
  border: 0;

  abbr[title],
  abbr[data-original-title] {
    text-decoration: none;
  }

  abbr {
    position: relative;
    z-index: 2;
  }

  .highlight {
    background-color: rgba(255, 218, 229, 0.5);
  }

  .react-calendar__tile--active {
    position: relative;
    background: #ffdae5;
    color: #000000d9;
  }
  .react-calendar__tile--active:focus {
    background: #ffdae5;
  }
  .react-calendar__tile--active:hover {
    background: rgba(255, 143, 176, 0.7);
  }

  .react-calendar__tile--now {
    background: rgba(210, 250, 130, 0.7);
  }
  .react-calendar__tile--now:hover {
    background: #ebebeb;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bababa;
  }
`
const StyledDot = styled.div`
  position: absolute;
  height: 25px;
  width: 25px;
  background-color: rgba(255, 218, 229, 1);
  border-radius: 50%;
  display: flex;
  margin: -20px 5px 0 6px;
  // z-index: 0;
`

export default Grass
