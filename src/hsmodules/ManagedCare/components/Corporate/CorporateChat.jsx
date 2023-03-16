import { useState, useContext, useCallback, useEffect } from 'react';
import { Box } from '@mui/system';
import { v4 as uuidv4 } from 'uuid';

import ChatInterface from '../../../../components/chat/ChatInterface';
import { ObjectContext, UserContext } from '../../../../context';
import dayjs from 'dayjs';
import client from '../../../../feathers';
import moment from 'moment';
import { toast } from 'react-toastify';

const CorporateChat = ({ closeChat }) => {
	const facilityServer = client.service('organizationclient');
	const { state, setState } = useContext(ObjectContext);
	const { user } = useContext(UserContext);
	const [sendingMsg, setSendingMsg] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	//const [prevM]

	const getChatMessages = useCallback(async () => {
		const id = state.facilityModule.selectedFacility._id;
		await facilityServer
			.get(id)
			.then((resp) => {
				//console.log(resp);
				setMessages(resp.chat || []);
			})
			.catch((err) => {
				//toast.error("There was an error getting messages for this chat");
				console.log(err);
			});
	}, [state.facilityModule.selectedFacility]);

	useEffect(() => {
		getChatMessages();

		facilityServer.on('created', (obj) => getChatMessages());
		facilityServer.on('updated', (obj) => getChatMessages());
		facilityServer.on('patched', (obj) => getChatMessages());
		facilityServer.on('removed', (obj) => getChatMessages());
	}, [getChatMessages]);

	const sendNewChatMessage = async () => {
		setSendingMsg(true);
		const employee = user.currentEmployee;
		const currentFac = state.facilityModule.selectedFacility;

		const messageDoc = {
			message: message,
			time: moment(),
			_id: uuidv4(),
			seen: [],
			status: 'delivered',
			//senderId: "000",
			senderId: employee.userId,
			dp: '',
			sender: `${employee.firstname} ${employee.lastname}`,
			type: 'text',
			dealId: currentFac._id,
		};

		const newChat = [...messages, messageDoc];

		const documentId = currentFac._id;
		console.log(
			'documentId',
			documentId,
			employee,
			currentFac,
			messageDoc,
			newChat,
		);
		await facilityServer
			.patch(documentId, { chat: newChat })
			.then((res) => {
				setMessage('');
				setSendingMsg(false);
				//toast.success("Message sent");
			})
			.catch((err) => {
				toast.error('Message failed:', err);
				setSendingMsg(false);
			});
	};

	const updateMessageAsSeen = async (message) => {
		// console.log(message);
		const userId = user.currentEmployee.userId;
		const currentFac = state.facilityModule.selectedFacility;
		const documentId = currentFac._id;

		const updatedMsg = { ...message, seen: [userId, ...message.seen] };

		const updatedChat = messages.map((item) => {
			if (item._id === updatedMsg._id) {
				return updatedMsg;
			} else {
				return item;
			}
		});

		await facilityServer
			.patch(documentId, { chat: updatedChat })
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<ChatInterface
				closeChat={closeChat}
				sendMessage={sendNewChatMessage}
				messages={messages}
				message={message}
				setMessage={setMessage}
				isSendingMessage={sendingMsg}
				markMsgAsSeen={updateMessageAsSeen}
			/>
		</Box>
	);
};

export default CorporateChat;
