document.getElementById('mean-form').addEventListener('click', function(event) {
    event.preventDefault(); //what it does?
    const row = parseInt(document.getElementById('row').value); 
    let table = document.getElementById('data-table');
    table.style.display = 'block';
    let totalfi = 0, totalfixi = 0, totalfilogxi = 0, totalfibyxi = 0;
    let AM, GM, HM;
    let result = '<table><thead><tr><th>Row</th><th>Lower bound</th><th>Upper bound</th><th>Frequency</th><th>x</th><th>f*x</th><th>f*logx</th><th>f/x</th></tr></thead><tbody>';
    for (let i = 0; i < row; i++) {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td><input type="number" id="Lb${i}" name="Lb${i}" required></td>
            <td><input type="number" id="Hb${i}" name="Hb${i}" required></td>
            <td><input type="number" id="fi${i}" name="fi${i}" required></td>
            <td id="xi${i}"></td>
            <td id="fixi${i}"></td>
            <td id="filogxi${i}"></td>
            <td id="fibyxi${i}"></td>
        `;
        table.querySelector('tbody').appendChild(tr);
    }
    let submitBtn = document.createElement('button');
    submitBtn.innerHTML = 'Calculate Means';
    submitBtn.addEventListener('click', function() {
        let data = [];
        for (let i = 0; i < row; i++) {
            let Lb = parseFloat(document.getElementById(`Lb${i}`).value);
            let Hb = parseFloat(document.getElementById(`Hb${i}`).value);
            let fi = parseFloat(document.getElementById(`fi${i}`).value);
            let xi = (Lb + Hb) / 2;
            let fixi = fi * xi;
            let filogxi = fi * Math.log10(xi);
            let fibyxi = fi / xi;
            totalfi += fi;
            totalfixi += fixi;
            totalfilogxi += filogxi;
            totalfibyxi += fibyxi;
            document.getElementById(`xi${i}`).textContent = xi.toFixed(2);
            document.getElementById(`fixi${i}`).textContent = fixi.toFixed(2);
            document.getElementById(`filogxi${i}`).textContent = filogxi.toFixed(2);
            document.getElementById(`fibyxi${i}`).textContent = fibyxi.toFixed(2);
            data.push({
                Lb: Lb,
                Hb: Hb,
                fi: fi,
                xi: xi,
                fixi: fixi,
                filogxi: filogxi,
                fibyxi: fibyxi
            });
        }
        result += `<tr><td colspan="3">Total</td><td>${totalfi}</td><td>${totalfixi.toFixed(2)}</td><td>${totalfilogxi.toFixed(2)}</td><td>${totalfibyxi.toFixed(2)}</td></tr></tbody></table>`;
        document.getElementById('result').innerHTML = result;
    });
    table.querySelector('tfoot').innerHTML = '<tr><td colspan="3">Total</td><td></td><td></td><td></td><td></td><td></td></tr>';
    table.querySelector('tfoot').appendChild(submitBtn);
});
