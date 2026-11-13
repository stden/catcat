// SleepyCat behavior and animation logic

class SleepyCat {
  constructor() {
    this.cat = document.getElementById('cat');
    this.message = document.getElementById('message');
    this.countdownTimer = null;
    this.timerActive = false;
    this.state = 'sleep';
    this.customMessage = 'Пора отдохнуть!';
    this.currentAction = '';
    
    this.init();
  }

  init() {
    this.setupContextMenu();
    this.setupTimerListeners();
  }

  setupContextMenu() {
    this.cat.addEventListener('dblclick', (e) => {
      e.preventDefault();
      window.electronAPI.showContextMenu();
    });
  }

  setupTimerListeners() {
    window.electronAPI.onStartTimer((minutes, message, action) => {
      this.customMessage = message || 'Пора отдохнуть!';
      this.currentAction = action || '';
      this.startTimer(minutes);
    });

    window.electronAPI.onResetTimer(() => {
      this.resetTimer();
    });
  }

  setState(newState) {
    this.cat.classList.remove('sleeping', 'stretching', 'sitting', 'timer-done', 'drinking');
    this.state = newState;
    
    if (newState === 'stretching') {
      this.cat.classList.add('stretching');
    } else if (newState === 'sitting') {
      this.cat.classList.add('sitting');
    } else if (newState === 'drinking') {
      this.cat.classList.add('drinking');
    }
    
    console.log('State changed to:', newState);
  }

  startTimer(minutes) {
    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
    }

    this.setState('sleep');
    this.timerActive = true;
    this.hideMessage();
    console.log(`Timer started: ${minutes} minutes, message: "${this.customMessage}", action: "${this.currentAction}"`);

    this.countdownTimer = setTimeout(() => {
      this.onTimerComplete();
    }, minutes * 60 * 1000);
  }

  onTimerComplete() {
    this.timerActive = false;
    console.log('Timer complete! Starting wake up sequence...');
    
    this.setState('stretching');
    
    setTimeout(() => {
      this.cat.classList.remove('stretching');
      
      // Check if action is "drink water"
      if (this.currentAction.includes('Попить') || this.currentAction.includes('воды')) {
        this.setState('drinking');
      } else {
        this.cat.classList.add('timer-done');
      }
      
      this.showMessage();
      this.playSound();
      console.log('Cat animation complete.');
    }, 2000);
  }

  playSound() {
    const audio = new Audio('fx/cat.wav');
    audio.play().catch(err => console.log('Sound play error:', err));
  }

  showMessage() {
    this.message.textContent = '🐱 ' + this.customMessage;
    this.message.classList.remove('hidden');
  }

  hideMessage() {
    this.message.classList.add('hidden');
  }

  resetTimer() {
    if (this.countdownTimer) {
      clearTimeout(this.countdownTimer);
      this.countdownTimer = null;
    }
    this.timerActive = false;
    this.currentAction = '';
    this.setState('sleep');
    this.hideMessage();
    console.log('Timer reset. Cat returned to sleep.');
  }
}

// Initialize SleepyCat when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new SleepyCat();
});
