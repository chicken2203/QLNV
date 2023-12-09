import React from 'react';

function OverlayCheckPermission({ children }) {
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 100,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    background: 'transparent',
                    padding: '12px 14px',
                    border: '2px solid #FF9E43',
                    color: '#FF9E43',
                    fontSize: '14px',
                }}
            >
                {children}
            </div>
        </div>
    );
}

export default OverlayCheckPermission;
