(function() {
    function createWidget() {
        const container = document.getElementById('feedbackbox-widget');
        if (!container) return;
        
        // Get configuration from data attributes
        const formId = container.dataset.form;
        const entryId = container.dataset.entry;
        
        if (!formId || !entryId) {
            container.innerHTML = '<div style="color: red; padding: 10px;">Error: Missing data-form or data-entry attributes</div>';
            return;
        }
        
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
        const INPUT_NAME = `entry.${entryId}`;
        
        container.innerHTML = `
            <div style="
                font-family: Arial, sans-serif;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 12px;
                width: 100%;
                max-width: none;
                background: white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                    <input 
                        id="feedback-input" 
                        type="text"
                        placeholder="What features do you want?"
                        style="
                            flex: 1;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                            padding: 8px;
                            font-size: 14px;
                            box-sizing: border-box;
                        "
                    />
                    <button 
                        id="feedback-submit"
                        style="
                            background: #007cba;
                            color: white;
                            border: none;
                            padding: 8px 12px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                            white-space: nowrap;
                        "
                    >Submit</button>
                </div>
                <div id="feedback-message" style="font-size: 12px;"></div>
            </div>
        `;
        
        const submitBtn = document.getElementById('feedback-submit');
        const input = document.getElementById('feedback-input');
        
        submitBtn.onclick = submitFeedback;
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitFeedback();
            }
        });
    }
    
    function submitFeedback() {
        const input = document.getElementById('feedback-input');
        const message = document.getElementById('feedback-message');
        const button = document.getElementById('feedback-submit');
        
        if (!input.value.trim()) {
            message.innerHTML = '<span style="color: red;">Please enter your feedback</span>';
            return;
        }
        

        
        button.disabled = true;
        button.textContent = 'Submitting...';
        
        const container = document.getElementById('feedbackbox-widget');
        const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${container.dataset.form}/formResponse`;
        const INPUT_NAME = `entry.${container.dataset.entry}`;
        
        const formData = new FormData();
        formData.append(INPUT_NAME, input.value);
        
        fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        })
        .then(() => {
            message.innerHTML = '<span style="color: green;">Thank you for your feedback!</span>';
            input.value = '';
            button.textContent = 'Submit';
            button.disabled = false;
        })
        .catch(() => {
            message.innerHTML = '<span style="color: red;">Error submitting. Please try again.</span>';
            button.textContent = 'Submit';
            button.disabled = false;
        });
    }
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createWidget);
    } else {
        createWidget();
    }
})();