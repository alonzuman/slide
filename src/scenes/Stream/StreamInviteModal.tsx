import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useQuery } from 'react-query'
import API from '../../API/API'
import Avatar from '../../core/Avatar'
import DefaultButton from '../../core/DefaultButton'
import ListItem from '../../core/ListItem'
import PrimaryButton from '../../core/PrimaryButton'
import SearchField from '../../core/SearchField'
import useStream, { useStreamInvites } from '../../hooks/useStream'
import { useUser } from '../../hooks/useUser'

export default function InviteModal() {
  const [keyword, setKeyword] = useState('')
  const { user } = useUser()
  const { data: users, isLoading } = useQuery(['user-following', user?._id], () => API.Users.getUserFollowing(user?._id))
  const { sendStreamInvite } = useStream()
  const invites = useStreamInvites()

  return (
    <>
      <SearchField
        value={keyword}
        onChangeText={setKeyword}
        placeholder='Search by full name'
        style={{ margin: 12 }}
      />
      {isLoading && <ActivityIndicator style={{ marginTop: 24 }} />}
      {!isLoading && users
        ?.filter(v => v?.name?.includes(keyword))
        ?.map(({ avatar, _id, name }) => {
          const isInvitedByCurrentUser = invites?.find(v => (v?.byUser === user?._id && v?.user === _id))

          const _renderAction = () => {
            if (isInvitedByCurrentUser) return <DefaultButton title='Invited!' size='s' />
            return <PrimaryButton size='s' title='Invite' onPress={() => sendStreamInvite(_id)} />
          }

          return (
            <ListItem
              key={_id}
              renderBefore={<Avatar size='m' uri={avatar} />}
              primary={name}
              renderAfter={_renderAction()}
            />
          )
        })}
    </>
  )
}
