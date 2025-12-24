// 화면 전환 함수
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 로컬 스토리지에서 데이터 가져오기
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// 로컬 스토리지에 데이터 저장
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// 비디오 렌더링
function renderVideos() {
    const videos = getData('videos');
    const container = document.getElementById('videoItems');
    
    if (videos.length === 0) {
        container.innerHTML = '<div class="empty-message">아직 저장된 비디오가 없습니다.</div>';
        return;
    }
    
    container.innerHTML = videos.map((video, index) => `
        <div class="item-card">
            <button class="delete-btn" onclick="deleteVideo(${index})">삭제</button>
            <h4>${video.title}</h4>
            <p>${video.description}</p>
            <a href="${video.url}" target="_blank">영상 보기 →</a>
        </div>
    `).join('');
}

// 글 렌더링
function renderTexts() {
    const texts = getData('texts');
    const container = document.getElementById('textItems');
    
    if (texts.length === 0) {
        container.innerHTML = '<div class="empty-message">아직 저장된 글이 없습니다.</div>';
        return;
    }
    
    container.innerHTML = texts.map((text, index) => `
        <div class="item-card">
            <button class="delete-btn" onclick="deleteText(${index})">삭제</button>
            <h4>${text.title}</h4>
            <p>${text.content.substring(0, 150)}${text.content.length > 150 ? '...' : ''}</p>
        </div>
    `).join('');
}

// 비디오 추가
function addVideo() {
    const title = document.getElementById('videoTitle').value.trim();
    const description = document.getElementById('videoDesc').value.trim();
    const url = document.getElementById('videoUrl').value.trim();
    
    if (!title || !url) {
        alert('제목과 URL은 필수 항목입니다.');
        return;
    }
    
    const videos = getData('videos');
    videos.push({ title, description, url, date: new Date().toISOString() });
    saveData('videos', videos);
    
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoDesc').value = '';
    document.getElementById('videoUrl').value = '';
    
    renderVideos();
    alert('비디오가 저장되었습니다!');
}

// 글 추가
function addText() {
    const title = document.getElementById('textTitle').value.trim();
    const content = document.getElementById('textContent').value.trim();
    
    if (!title || !content) {
        alert('제목과 내용은 필수 항목입니다.');
        return;
    }
    
    const texts = getData('texts');
    texts.push({ title, content, date: new Date().toISOString() });
    saveData('texts', texts);
    
    document.getElementById('textTitle').value = '';
    document.getElementById('textContent').value = '';
    
    renderTexts();
    alert('글이 저장되었습니다!');
}

// 비디오 삭제
function deleteVideo(index) {
    if (confirm('정말 이 비디오를 삭제하시겠습니까?')) {
        const videos = getData('videos');
        videos.splice(index, 1);
        saveData('videos', videos);
        renderVideos();
    }
}

// 글 삭제
function deleteText(index) {
    if (confirm('정말 이 글을 삭제하시겠습니까?')) {
        const texts = getData('texts');
        texts.splice(index, 1);
        saveData('texts', texts);
        renderTexts();
    }
}

// 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
    // 메인 -> 카테고리
    document.getElementById('saveBtn').addEventListener('click', () => {
        showScreen('categoryScreen');
    });
    
    // 카테고리 -> 메인
    document.getElementById('backToMain').addEventListener('click', () => {
        showScreen('mainScreen');
    });
    
    // 카테고리 -> 비디오
    document.getElementById('videoCategory').addEventListener('click', () => {
        showScreen('videoScreen');
        renderVideos();
    });
    
    // 카테고리 -> 글
    document.getElementById('textCategory').addEventListener('click', () => {
        showScreen('textScreen');
        renderTexts();
    });
    
    // 비디오 -> 카테고리
    document.getElementById('backFromVideo').addEventListener('click', () => {
        showScreen('categoryScreen');
    });
    
    // 글 -> 카테고리
    document.getElementById('backFromText').addEventListener('click', () => {
        showScreen('categoryScreen');
    });
    
    // 비디오 추가
    document.getElementById('addVideo').addEventListener('click', addVideo);
    
    // 글 추가
    document.getElementById('addText').addEventListener('click', addText);
});
