'use strict';


class BeaverSurvey {
    constructor({ name, frequency, favoriteSpecies, skill, comment, agree }) {
        this.name            = name;
        this.frequency       = frequency;
        this.favoriteSpecies = favoriteSpecies;
        this.skill           = skill;
        this.comment         = comment;
        this.agree           = agree;
        this.submittedAt     = new Date();
    }

    print() {
        console.table({
            'Имя':              this.name,
            'Частота встреч':   this.frequency,
            'Любимый вид':      this.favoriteSpecies,
            'Оценка (1–10)':    this.skill,
            'Комментарий':      this.comment || '—',
            'Согласие':         this.agree ? 'да' : 'нет',
            'Отправлено':       this.submittedAt.toLocaleString('ru-RU')
        });
        console.log('Объект результата:', this);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#survey-form');
    if (!form) return;

    const skillInput = document.querySelector('#skill');
    const skillLabel = document.querySelector('#skill-value');
    if (skillInput && skillLabel) {
        skillInput.addEventListener('input', () => {
            skillLabel.textContent = skillInput.value;
        });
    }

    const errorBox = document.querySelector('#form-error');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const checkedFrequency = form.querySelector(
            'input[name="frequency"]:checked'
        );

        const data = {
            name:            form.name.value.trim(),
            frequency:       checkedFrequency ? checkedFrequency.value : '',
            favoriteSpecies: form.favoriteSpecies.value,
            skill:           Number(form.skill.value),
            comment:         form.comment.value.trim(),
            agree:           form.agree.checked
        };

        const errors = [];
        if (data.name.length < 2) {
            errors.push('Укажите имя (не менее 2 символов).');
        }
        if (!data.agree) {
            errors.push('Нужно согласие на обработку данных.');
        }

        if (errors.length) {
            errorBox.textContent = errors.join(' ');
            errorBox.style.display = 'block';
            return;
        }

        errorBox.style.display = 'none';

        const survey = new BeaverSurvey(data);
        survey.print();

        form.reset();
        if (skillLabel) skillLabel.textContent = '7';
    });
        form.addEventListener('reset', () => {
        errorBox.style.display = 'none';
        errorBox.textContent = '';
        setTimeout(() => {
            if (skillLabel && skillInput) {
                skillLabel.textContent = skillInput.value;
            }
        },0);
    });
});