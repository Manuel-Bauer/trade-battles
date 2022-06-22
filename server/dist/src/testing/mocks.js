"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secondBattleResult = exports.secondBattleInput = exports.getFirstBattleUpdate = exports.firstBattleResult = exports.firstBattleInput = exports.incorrectUserInput = exports.secondUserResult = exports.secondUserInput = exports.firstUserResult = exports.firstUserInput = void 0;
exports.firstUserInput = {
    familyName: 'Buz',
    givenName: 'Maxim',
    id: 'p93712henp237o',
    photo: 'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
    email: 'test@tester.com',
};
exports.firstUserResult = {
    familyName: 'Buz',
    givenName: 'Maxim',
    google_id: 'p93712henp237o',
    photo: 'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
    email: 'test@tester.com',
    id: 1,
    watchlist: [],
};
exports.secondUserInput = {
    familyName: 'Luca',
    givenName: 'Stendardo',
    id: '1302rnou2ü38',
    photo: 'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
    email: 'luca@stendardo.com',
};
exports.secondUserResult = {
    familyName: 'Luca',
    givenName: 'Stendardo',
    google_id: '1302rnou2ü38',
    id: 2,
    photo: 'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
    email: 'luca@stendardo.com',
    watchlist: [],
};
exports.incorrectUserInput = {
    familyName: 'Luca',
    givenName: 'Stendardo',
    photo: 'https://thumbs.dreamstime.com/z/italian-supporter-painted-butt-posing-beautiful-italy-colors-41500797.jpg',
    email: 'luca@stendardo.com',
};
exports.firstBattleInput = {
    budget: 10000000,
    battle_name: 'First Battle',
    start_date: new Date('2022-06-20T14:19:02.370Z'),
    end_date: new Date('2022-06-22T14:19:02.370Z'),
    users: [{ id: 1 }, { id: 2 }],
};
exports.firstBattleResult = {
    budget: 10000000,
    battle_name: 'First Battle',
    start_date: new Date('2022-06-20T14:19:02.370Z'),
    end_date: new Date('2022-06-22T14:19:02.370Z'),
    completed: false,
    winner: null,
    users: [exports.firstUserResult, exports.secondUserResult],
    id: 1,
};
function getFirstBattleUpdate(userName) {
    return {
        winner: userName,
        completed: true,
    };
}
exports.getFirstBattleUpdate = getFirstBattleUpdate;
exports.secondBattleInput = {
    budget: 20000000,
    battle_name: 'Second Battle',
    start_date: new Date('2022-06-19T14:19:02.370Z'),
    end_date: new Date('2022-06-23T14:19:02.370Z'),
    users: [{ id: 1 }],
};
exports.secondBattleResult = {
    budget: 20000000,
    battle_name: 'Second Battle',
    start_date: new Date('2022-06-19T14:19:02.370Z'),
    end_date: new Date('2022-06-23T14:19:02.370Z'),
    completed: false,
    winner: null,
    users: [exports.firstUserResult],
    id: 2,
};
