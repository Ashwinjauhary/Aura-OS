import React, { useState } from 'react';
import { Delete } from 'lucide-react';

const BUTTONS = [
    ['AC', '+/-', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
];

export default function CalculatorApp() {
    const [display, setDisplay] = useState('0');
    const [prev, setPrev] = useState(null);
    const [op, setOp] = useState(null);
    const [fresh, setFresh] = useState(false);

    const operate = (a, b, operator) => {
        switch (operator) {
            case '+': return a + b;
            case '−': return a - b;
            case '×': return a * b;
            case '÷': return b !== 0 ? a / b : 'Error';
        }
    };

    const handleBtn = (val) => {
        if (val === 'AC') { setDisplay('0'); setPrev(null); setOp(null); setFresh(false); return; }
        if (val === '+/-') { setDisplay(d => String(parseFloat(d) * -1)); return; }
        if (val === '%') { setDisplay(d => String(parseFloat(d) / 100)); return; }

        if (['+', '−', '×', '÷'].includes(val)) {
            setPrev(parseFloat(display));
            setOp(val);
            setFresh(true);
            return;
        }

        if (val === '=') {
            if (op && prev !== null) {
                const result = operate(prev, parseFloat(display), op);
                const str = typeof result === 'number'
                    ? (Number.isInteger(result) ? String(result) : parseFloat(result.toFixed(10)).toString())
                    : result;
                setDisplay(str);
                setPrev(null);
                setOp(null);
                setFresh(false);
            }
            return;
        }

        if (val === '.') {
            const current = fresh ? '0' : display;
            if (!current.includes('.')) setDisplay(current + '.');
            setFresh(false);
            return;
        }

        if (fresh || display === '0') {
            setDisplay(val);
            setFresh(false);
        } else {
            setDisplay(d => d.length < 12 ? d + val : d);
        }
    };

    const isOp = (v) => ['+', '−', '×', '÷'].includes(v);

    return (
        <div className="h-full flex flex-col bg-black">
            {/* Display */}
            <div className="flex-1 flex flex-col justify-end items-end px-6 pb-4">
                {op && <p className="text-white/30 text-[18px] mb-1">{prev} {op}</p>}
                <p className="text-white font-light break-all text-right"
                    style={{ fontSize: display.length > 9 ? '36px' : '64px', lineHeight: 1.1 }}>
                    {display}
                </p>
            </div>

            {/* Buttons */}
            <div className="px-3 pb-6 flex flex-col gap-3">
                {BUTTONS.map((row, ri) => (
                    <div key={ri} className={`flex gap-3 ${row.length === 3 ? '' : ''}`}>
                        {row.map((btn, bi) => {
                            const isZero = btn === '0';
                            const isOpBtn = isOp(btn);
                            const isActiveOp = op === btn;
                            const isFunc = ['AC', '+/-', '%'].includes(btn);
                            const isEq = btn === '=';

                            let bg = 'bg-[#333333]';
                            let text = 'text-white';
                            if (isFunc) { bg = 'bg-[#a5a5a5]'; text = 'text-black'; }
                            if (isOpBtn || isEq) { bg = isActiveOp ? 'bg-white' : 'bg-[#ff9f0a]'; text = isActiveOp ? 'text-[#ff9f0a]' : 'text-white'; }

                            return (
                                <button
                                    key={bi}
                                    onClick={() => handleBtn(btn)}
                                    className={`${isZero ? 'flex-[2]' : 'flex-1'} h-[72px] rounded-full ${bg} ${text} font-medium active:opacity-70 transition-opacity flex items-center ${isZero ? 'justify-start pl-7' : 'justify-center'}`}
                                    style={{ fontSize: isOpBtn || isEq ? '28px' : '24px' }}
                                >
                                    {btn}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
