import { useEffect, useState } from "react";
import { IStat } from "../../types/stat.types";
import { useSearchParams } from "react-router-dom";
import { statService } from "../../service/stat.service";
import ChartKit, { settings } from "@gravity-ui/chartkit";
import { YagrPlugin } from "@gravity-ui/chartkit/yagr";
import { Card, Text, Loader, ThemeProvider } from "@gravity-ui/uikit";
import { Users, MousePointer, TrendingUp } from "lucide-react";
import type { YagrWidgetData } from "@gravity-ui/chartkit/yagr";

// Настройка плагинов для ChartKit
settings.set({ plugins: [YagrPlugin] });

export default function Stats() {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("secret_key");
  const [stat, setStat] = useState<IStat | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!key) {
      setError("Секретный ключ не найден");
      setLoading(false);
      return;
    }

    const fetchStat = async () => {
      try {
        setLoading(true);
        const response = await statService.getStat(key);
        if (response?.success && response.data?.data) {
          setStat(response.data.data);
        } else {
          setError("Данные не найдены");
        }
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchStat();
  }, [key]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader size="l" />
          <p className="mt-4 text-gray-400">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  if (error || !stat) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Ошибка</h1>
          <p className="text-gray-400">{error || "Данные не найдены"}</p>
        </div>
      </div>
    );
  }

  // Подготовка данных для линейного графика
  // Сортируем данные по датам для корректного отображения
  const sortedActiveUsers = [...stat.activeUsersByDays].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lineChartData: YagrWidgetData = {
    data: {
      timeline: sortedActiveUsers.map((item) => {
        // Парсим дату в UTC, чтобы избежать проблем с временными зонами
        const [year, month, day] = item.date.split("-").map(Number);
        return Date.UTC(year, month - 1, day);
      }),
      graphs: [
        {
          id: "activeUsers",
          name: "Активные пользователи",
          color: "#ef4444",
          data: sortedActiveUsers.map((item) => item.count),
        },
      ],
    },
    libraryConfig: {
      chart: {
        series: {
          type: "line",
        },
      },
      title: {
        text: "Активные пользователи по дням",
      },
      axes: {
        y: {
          label: "Количество пользователей",
        },
      },
    },
  };

  // Подготовка данных для столбчатой диаграммы кликов по страницам
  const sortedPageClicks = [...stat.pageClicks].sort(
    (a, b) => b.clicks - a.clicks
  );

  const barChartData: YagrWidgetData = {
    data: {
      timeline: sortedPageClicks.map((_, index) => index),
      graphs: [
        {
          id: "pageClicks",
          name: "Клики",
          color: "#ef4444",
          data: sortedPageClicks.map((item) => item.clicks / 2),
        },
      ],
    },
    libraryConfig: {
      chart: {
        series: {
          type: "column",
        },
      },
      title: {
        text: "Клики по страницам",
      },
      axes: {
        x: {
          label: "Страницы",
        },
        y: {
          label: "Количество кликов",
        },
      },
    },
  };

  return (
    <ThemeProvider theme="dark">
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            Статистика FitMe
          </h1>

          {/* Карточки статистики */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-zinc-950 border-red-900/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <Users className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <Text variant="subheader-2" color="secondary">
                    Всего пользователей:
                  </Text>
                  <Text variant="display-2" color="primary">
                    {" "}
                    {stat.totalUsers.toLocaleString()}
                  </Text>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-950 border-red-900/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <Text variant="subheader-2" color="secondary">
                    Активных за период:
                  </Text>
                  <Text variant="display-2" color="primary">
                    {" "}
                    {stat.activeUsersByDays
                      .reduce((sum, day) => sum + day.count, 0)
                      .toLocaleString()}
                  </Text>
                </div>
              </div>
            </Card>

            <Card className="bg-zinc-950 border-red-900/20 p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/20 rounded-lg">
                  <MousePointer className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <Text variant="subheader-2" color="secondary">
                    Всего кликов:
                  </Text>
                  <Text variant="display-2" color="primary">
                    {" "}
                    {(
                      stat.pageClicks.reduce(
                        (sum, page) => sum + page.clicks,
                        0
                      ) / 2
                    ).toLocaleString()}
                  </Text>
                </div>
              </div>
            </Card>
          </div>

          {/* Графики */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Линейный график активных пользователей */}
            <Card className="bg-zinc-950 border-red-900/20 p-6">
              <Text variant="header-2" className="mb-4">
                Активные пользователи по дням
              </Text>
              <div className="h-80">
                <ChartKit type="yagr" data={lineChartData} />
              </div>
              {/* Показываем последние 5 записей для проверки */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <Text variant="body-2" color="secondary" className="mb-2">
                  Последние записи:
                </Text>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {sortedActiveUsers.slice(-5).map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between bg-gray-800/50 p-2 rounded"
                    >
                      <span className="text-gray-400">
                        {new Date(item.date).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                      <span className="text-red-400 font-semibold">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Столбчатая диаграмма кликов по страницам */}
            <Card className="bg-zinc-950 border-red-900/20 p-6">
              <Text variant="header-2" className="mb-4">
                Клики по страницам
              </Text>
              <div className="h-80">
                <ChartKit type="yagr" data={barChartData} />
              </div>
              {/* Легенда для столбцов */}
              <div className="mt-4 space-y-2">
                {sortedPageClicks.slice(0, 5).map((page, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-red-500 rounded flex-shrink-0"></div>
                    <span className="text-gray-400 font-mono truncate">
                      {index + 1}. {page.url}
                    </span>
                    <span className="text-red-400 font-semibold ml-auto">
                      {(page.clicks / 2).toLocaleString()}
                    </span>
                  </div>
                ))}
                {sortedPageClicks.length > 5 && (
                  <p className="text-gray-500 text-xs italic">
                    ...и еще {sortedPageClicks.length - 5} страниц (смотрите
                    таблицу ниже)
                  </p>
                )}
              </div>
            </Card>
          </div>

          {/* Таблица детальной статистики */}
          <Card className="bg-zinc-950 border-red-900/20 p-6">
            <Text variant="header-2" className="mb-4">
              Детальная статистика по страницам
            </Text>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300">
                      URL страницы
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300">
                      Количество кликов
                    </th>
                    <th className="text-right py-3 px-4 text-gray-300">
                      Процент от общего
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stat.pageClicks
                    .sort((a, b) => b.clicks - a.clicks)
                    .map((page, index) => {
                      const totalClicks = stat.pageClicks.reduce(
                        (sum, p) => sum + p.clicks,
                        0
                      );
                      const percentage = (
                        (page.clicks / (totalClicks / 2)) *
                        100
                      ).toFixed(1);
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-800 hover:bg-gray-800/50"
                        >
                          <td className="py-3 px-4 text-white font-mono text-sm">
                            {page.url}
                          </td>
                          <td className="py-3 px-4 text-right text-red-400 font-semibold">
                            {(page.clicks / 2).toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-400">
                            {percentage}%
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
