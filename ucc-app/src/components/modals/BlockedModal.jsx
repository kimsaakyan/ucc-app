import React from 'react';

const BlockedModal = ({ isBlockedModalVisible, toggleBlockedModal }) => {
    const onClickHandler = (action) => {
        switch (action) {
            case 'cancel': {
                toggleBlockedModal(!isBlockedModalVisible);
                break;
            }
            case 'help': {
                // toggleBlockedModal(!isBlockedModalVisible);
                // navigate('/help');
                break;
            }
            default: {
                break;
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 w-[300px] h-[250px] flex flex-col items-center justify-between rounded-md">
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-20 h-20 text-gray-300"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                    </svg>
                </div>
                <p className="text-black font-bold">Your account is blocked.</p>
                <div className="flex gap-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-md text-xs font-semibold">
                        Help
                    </button>
                    <button
                        onClick={() => onClickHandler('cancel')}
                        className="bg-white border hover:bg-gray-50 text-gray-400 py-2 px-4 rounded-md text-xs font-semibold"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockedModal;
