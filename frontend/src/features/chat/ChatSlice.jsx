// const initialState = [
// 	{
// 		id: 0,
// 		user: undefined,
// 		messages: [],
// 	},
// ];

// function incrementID(chat) {
// 	const chatID = chat.reduce((chatID, chat) => Math.max(chat.id, chatID), -1);
// 	return chatID + 1;
// }

// export default function chatReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case "chat/messageAdded": {
// 			return {
// 				...state,

// 				chat: [
// 					...state.chat,
// 					{
// 						id: incrementID(state.chat),
// 						user: action.payload,
// 						messages: action.payload,
// 					},
// 				],
// 			};
// 		}

// 		default:
// 			return state;
// 	}
// }
